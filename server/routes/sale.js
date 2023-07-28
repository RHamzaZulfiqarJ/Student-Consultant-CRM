import express from 'express'
import { createSale, getSale, getSales, updateSale, deleteSale, deleteWholeCollection } from '../controllers/sale.js'
import { verifyEmployee, verifyManager, verifyToken } from '../middleware/auth.js'

const router = express.Router()

// GET
router.get('/get/single/:saleId', verifyToken, verifyManager, getSale)
router.get('/get/all', verifyToken, verifyManager, getSales)

// POST
router.post('/create', verifyToken, verifyEmployee, createSale)

// PUT
router.put('/update/:saleId', verifyToken, verifyEmployee, updateSale)

// DELETE
router.delete('/delete/:saleId', verifyToken, verifyEmployee, deleteSale)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router