import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '@services/user.services'
import { Request, Response } from 'express'

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers
    res.status(200).json(users)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(parseInt(req.params.id))
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = await deleteUser(parseInt(req.params.id))
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}
