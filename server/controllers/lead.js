import Lead from '../models/lead.js'
import User from '../models/user.js'
import { createError, isValidDate } from '../utils/error.js'
import validator from 'validator'

export const getLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId).populate('clientId').populate('createdBy').populate('allocatedTo').exec()
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        res.status(200).json({ result: findedLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeads = async (req, res, next) => {
    try {
        const { new: new_query, type } = req.query;

        let query = {};
        if (new_query) {
            query = type ? { type, isArchived: false } : { isArchived: false };
        } else {
            query = type ? { type, isArchived: false } : { isArchived: false };
        }

        const findedLeads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('clientId').populate('createdBy')
            .populate('allocatedTo')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
};

export const getEmployeeLeads = async (req, res, next) => {
    try {
        const findedLeads = await Lead.find({ allocatedTo: req.user?._id, isArchived: false })
            .populate('clientId').populate('createdBy')
            .exec();

        res.status(200).json({ result: findedLeads, message: 'Leads fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message));
    }
}

export const getArchivedLeads = async (req, res, next) => {
    try {

        const findedLeads = await Lead.find({ isArchived: true }).populate('clientId').populate('createdBy').exec()
        res.status(200).json({ result: findedLeads, message: 'Archived leads fetched successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const getLeadsStat = async (req, res, next) => {
    try {

        const leadStats = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    value: '$count',
                },
            },
        ]);

        const statusEnum = ['successful', 'unsuccessful', 'underProcess', 'declined', 'remaining'];
        const leadsStatArray = statusEnum.map(status => {
            const stat = leadStats.find(stat => stat.name === status);
            return {
                name: status,
                value: stat ? stat.value : 0,
            };
        });

        res.status(200).json({ result: leadsStatArray, message: 'Leads stats fetched successfully', success: true });
    } catch (err) {
        next(createError(500, err.message))
    }
}

export const searchLead = async (req, res, next) => {
    const { searchTerm } = req.query;

    const searchPattern = new RegExp(searchTerm, 'i');

    try {
        const matchingUserIds = await User.find({
            $or: [
                { username: searchPattern },
                { email: searchPattern },
                { firstName: searchPattern },
                { lastName: searchPattern },
                { cnic: searchPattern },
            ],
        }).select('_id');

        const searchResults = await Lead.find({
            $or: [
                { clientId: { $in: matchingUserIds } },
                { allocatedTo: { $in: matchingUserIds } },
                { city: searchPattern },
                { project: searchPattern },
                { region: searchPattern },
                { propertyType: searchPattern },
                { homeType: searchPattern },
                { clientType: searchPattern },
                { beds: searchPattern },
                { source: { $in: [searchPattern] } },
                { type: searchPattern },
            ],
        })
            .populate('clientId').populate('createdBy')
            .populate('allocatedTo')
            .exec();

        res.status(200).json({ result: searchResults });
    } catch (error) {
        next(createError(500, error.message))
    }
};

export const filterLead = async (req, res, next) => {
    const { startingDate, endingDate, ...filters } = req.query;
    try {
        let query = Lead.find(filters);

        // Check if startingDate is provided and valid
        if (startingDate && isValidDate(startingDate)) {
            const startDate = new Date(startingDate);
            startDate.setHours(0, 0, 0, 0);

            // Add createdAt filtering for startingDate
            query = query.where('createdAt').gte(startDate);
        }

        // Check if endingDate is provided and valid
        if (endingDate && isValidDate(endingDate)) {
            const endDate = new Date(endingDate);
            endDate.setHours(23, 59, 59, 999);

            // Add createdAt filtering for endingDate
            if (query.model.modelName === 'Lead') { // Check if the query has not been executed yet
                query = query.where('createdAt').lte(endDate);
            }
        }

        query = await query.populate('clientId').populate('createdBy').populate('allocatedTo').exec();
        res.status(200).json({ result: query });

    } catch (error) {
        next(createError(500, error.message));
    }
};




export const createOnsiteLead = async (req, res, next) => {
    try {

        let { gender, firstName, lastName, phone, email, cnic, allocatedTo, ...leadData } = req.body

        if (!firstName || !lastName || !gender || !email || !phone || !cnic) return next(createError(400, 'Make sure to provide all the client fields'))
        if (!validator.isEmail(email)) return next(createError(400, 'Invalid Email Address'))

        allocatedTo = allocatedTo ?? mongoose.Types.ObjectId(req.user._id)

        // create new client
        const findedUser = await User.findOne({ email })
        if (Boolean(findedUser)) return next(createError(400, 'Email already exist'))
        const newClient = await User.create({ gender, firstName, lastName, phone, email, cnic })

        // create new lead
        const newLead = await Lead.create({ ...leadData, createdBy: req.user._id, allocatedTo, clientId: newClient._id, type: 'onsite' })
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const createOnlineLead = async (req, res, next) => {
    try {

        let { projectId, ...clientData } = req.body

        const emailExist = await User.find({ email: clientData.email })
        if (emailExist) return next(createError(400, 'Email already exist'))
        const usernaeExist = await User.find({ username: clientData.username })
        if (usernaeExist) return next(createError(400, 'Username already exist'))
        const phoneExist = await User.find({ phone: clientData.phone })
        if (phoneExist) return next(createError(400, 'Phone already exist'))

        const newClient = await User.create({ ...clientData })

        const newLead = await Lead.create({ type: 'online', projectId, clientId: newClient._id })
        res.status(200).json({ result: newLead, message: 'lead created successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const updateLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        let { _id: inputLeadId, allocatedTo, ...leadData } = req.body    // lead data
        let { gender, firstName, lastName, phone, email, cnic, } = req.body // client data

        // for online lead, (clientId is populated version (actually it is user/client document) )
        if (leadData?.clientId) {
            await User.findByIdAndUpdate(leadData.clientId._id, { gender, firstName, lastName, phone, email, cnic }, { new: true })
        }

        allocatedTo = allocatedTo ?? req.user._id

        // create new lead
        const updatedLead = await Lead.findByIdAndUpdate(leadId, { $set: { ...leadData, allocatedTo } }, { new: true }).populate('clientId').populate('createdBy').populate('allocatedTo').exec()
        res.status(200).json({ result: updatedLead, message: 'lead updated successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const archiveLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const result = await Lead.findByIdAndUpdate(leadId, { $set: { isArchived: true } }, { new: true })
        res.status(200).json({ result, message: 'lead deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}
export const deleteLead = async (req, res, next) => {
    try {

        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!findedLead) return next(createError(400, 'Lead not exist'))

        const deletedLead = await Lead.findByIdAndDelete(leadId)
        res.status(200).json({ result: deletedLead, message: 'lead deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {

        const result = await Lead.deleteMany()
        res.status(200).json({ result, message: 'Lead collection deleted successfully', success: true })

    } catch (err) {
        next(createError(500, err.message))
    }
}