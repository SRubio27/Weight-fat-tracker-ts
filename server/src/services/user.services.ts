import { prisma } from '../db'
import { NonIdUser, User } from '../type'
// import bcrypt from 'bcrypt'

export const getAllUsers = prisma.user.findMany()

// Funcion que recoge un usuario de la base de datos mediante su id
export const getUser = async (id: number): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (user == null) {
    throw new Error('User doesnt exist by this id')
  }

  return user
}

// Función que crea el usuario en la base de datos
export const createUser = async ({ name, email, password }: NonIdUser): Promise<any> => {
  // Verificamos si el email ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser != null) {
    throw new Error('El email ya está registrado')
  }

  // Encriptamos la contraseña antes de guardarla
  // const hashedPassword = await bcrypt.hash(password, 10)

  // Creamos el nuevo usuario
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password
    },
    select: {
      id: true,
      name: true,
      email: true
      // No devolvemos la contraseña
    }
  })

  return newUser
}

export const deleteUser = async (id: number): Promise<any> => {
  if (!await existingUserById(id)) {
    throw new Error('This user doesnt exist')
  }

  const user = await prisma.user.delete({
    where: { id }
  })

  const userMeasurements = await prisma.measurement.deleteMany({
    where: { userId: id }
  })

  return { user, userMeasurements }
}

export const updateUser = async ({ id, name, email, password }: User): Promise<any> => {
  if (!await existingUserById(id)) {
    throw new Error('This user doesnt exist')
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      password
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  })

  return updatedUser
}

const existingUserById = async (id: number): Promise<boolean> => {
  if ((await prisma.user.findUnique({ where: { id } })) != null) {
    return true
  }

  return false
}
