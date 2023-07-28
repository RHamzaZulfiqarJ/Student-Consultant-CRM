import express from 'express'
import { getUsers, getUser, updateRole, updateUser, deleteUser, getClients, getEmployees, deleteWholeCollection } from '../controllers/user.js'
import { verifyManager, verifyEmployee, verifyToken } from '../middleware/auth.js'

const router = express.Router()

const verifyIsSameUser = (req, res, next) => {
    try {
        if (req.user._id == req.params.userId || req.user.role == ('manager' || 'super-admin')) next()
        else next(createError(401, 'Only specific user can access this route'))
    } catch (err) {
        next(createError(500, err.message))

    }
}

// GET
router.get('/get/all', verifyToken,  getUsers)
router.get('/get/single/:userId', verifyToken, verifyIsSameUser, getUser) // verifyIsSameUser
router.get('/get/clients', verifyToken, verifyEmployee, getClients)      // only clients // verifyEmployee
router.get('/get/employees', verifyToken, verifyManager, getEmployees)   // all employees // verifyManager

// PUT
router.put('/update-role/:userId', verifyToken, verifyManager, updateRole) // verifyManager
router.put('/update/:userId', verifyToken, verifyIsSameUser, updateUser) // verifyManager

// DELETE
router.delete('/delete/:userId', verifyToken, verifyIsSameUser, deleteUser) // verifyManager
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router