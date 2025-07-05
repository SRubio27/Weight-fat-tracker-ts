import { deleteUserController, getAllUsersController, getUserController, registerUserController, updateUserController } from '@controllers/user.controllers'
import express from 'express'
const router = express.Router()

// GET

router.get('/', getAllUsersController)
router.get('/:id', getUserController)

// POST
router.post('/register', registerUserController)
router.post('/delete/;id', deleteUserController)
router.post('/update', updateUserController)

export default router
