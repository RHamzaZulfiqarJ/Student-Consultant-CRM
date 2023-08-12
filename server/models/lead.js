import { Schema, model } from 'mongoose'

const leadSchema = Schema({

    clientId: { type: Schema.Types.ObjectId, ref: 'User' },
    city: { type: String },
    project: { type: String },
    block: { type: String },
    propertyType: { type: String },
    homeType: { type: String },         // define enum
    minBudget: { type: Number, min: 0 },
    maxBudget: { type: Number, min: 0 },
    minAreaUnit: { type: String },      // define enum
    minArea: { type: Number, min: 0 },
    maxAreaUnit: { type: String },
    maxArea: { type: Number, min: 0 },
    priority: { type: String },     // define enum
    clientType: { type: String },       // define enum
    allocatedTo: { type: String },
    beds: { type: String },
    // progress: { type: Number },
    // status: { type: String, },
    source: { type: Array },

    type: { type: String, required: false, default: 'onsite', enum: ['onsite', 'online'] },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: false }            // todo: replace with ObjectId

}, { timestamps: true })

const leadModel = model('Lead', leadSchema)
export default leadModel