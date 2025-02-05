import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js'
import { createAddress, deleteByUserId, getByUserId, updateByUserId } from '../controller/address.controller.js'
const router = express.Router()

router
    .post("/create", authMiddleware, createAddress)
    .get("/get/user/:id", authMiddleware, getByUserId)
    .patch('/update/user/:id', authMiddleware, updateByUserId)
    .delete('/delete/user/:id', authMiddleware, deleteByUserId)

export default router;