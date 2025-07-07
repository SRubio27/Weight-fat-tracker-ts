/* eslint-disable no-multi-spaces */
import { Measurement } from '@prisma/client'
import { prisma } from '../db'
/*
// #### GET
getAllMeasurements                    -> Devuelve todas las mediciones (función sin filtros)
getMeasurementsByUserId               -> Devuelve mediciones de un usuario (requiere ID y validación de existencia)
getMeasurementById                    -> Devuelve una medición concreta por ID
getUserMeasurementByDate              -> Devuelve mediciones de un usuario en una fecha exacta
getMeasurementsByDateRangeAndUserId   -> Devuelve mediciones entre fechas (de un usuario)

// #### DELETE
deleteMeasurementsByUserId            -> Elimina todas las mediciones de un usuario
deleteMeasurementById                 -> Elimina una medición específica

// #### UTILS
existingUserById                      -> Comprueba si existe un usuario por ID

*/
//  #########
//  ###GET###
//  #########

// Obtain all measurements
export const getAllMeasurements = async (): Promise<any> => {
  const measurements = await prisma.measurement.findMany()
  return measurements
}
// Obtain all measurements of one user
export const getMeasurementsByUserId = async (userId: number): Promise<any> => {
  if (!await existingUserById(userId)) {
    throw new Error('This user doesnt exist')
  }

  const measurements = await prisma.measurement.findMany({
    where: { userId }
  })
  if (measurements.length === 0) {
    throw new Error('This user has no measurements yet.')
  }

  return measurements
}

// Obtain a measurement by id
export const getMeasurementById = async (id: number): Promise<any> => {
  const measurement = await prisma.measurement.findUnique({
    where: { id }
  })
  if (measurement == null) {
    throw new Error('This measurement id doesnt exist.')
  }

  return measurement
}

// Obtain a user measurement by date
export const getUserMeasurementByDate = async (date: Date, userId: number): Promise<any> => {
  // Create a date range for the entire day
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0) // Set time to the beginning of the day

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999) // Set time to the end of the day

  const measurements = await prisma.measurement.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay, // Greater than or equal to the start of the day
        lt: endOfDay // Less than the end of the day (up to the last millisecond)
      }
    }
  })

  // Check if any measurements were found
  if (measurements.length === 0) {
    throw new Error('There is no measurement of this day for this user')
  }

  return measurements // Return the found measurements
}

// Obtain user measurements within a date range
export const getMeasurementsByDateRangeAndUserId = async (userId: number, fromDate: Date, toDate: Date): Promise<any> => {
  // Ensure the user exists
  if (!await existingUserById(userId)) {
    throw new Error('This user does not exist')
  }

  fromDate.setHours(0, 0, 0, 0) // Set time to the beginning of the day

  toDate.setHours(23, 59, 59, 999) // Set time to the end of the day

  // Find measurements within the date range for the user
  const measurements = await prisma.measurement.findMany({
    where: {
      userId,
      date: {
        gte: fromDate, // Greater than or equal to the start date
        lte: toDate // Less than or equal to the end date
      }
    },
    orderBy: {
      date: 'asc' // Optional: order results by date
    }
  })

  if (measurements.length === 0) {
    throw new Error('No measurements found for this user in the specified date range.')
  }

  return measurements
}

//  ##########
//  ###POST###
//  ##########

// Delete all measurements from a user
export const deleteMeasurementsByUserId = async (userId: number): Promise<any> => {
  if (!await existingUserById(userId)) {
    throw new Error('This user doesnt exist')
  }

  const measurements = await prisma.measurement.deleteMany({
    where: { userId }
  })
  if (measurements.count === 0) {
    throw new Error('This user has no measurements yet.')
  }

  return measurements
}

// Delete one measurement
export const deleteMeasurementById = async (id: number): Promise<any> => {
  try {
    const measurement = await prisma.measurement.delete({
      where: { id }
    })
    return measurement
  } catch (error: any) {
    // Puedes manejar el error aquí o lanzarlo
    throw new Error('This measurement id does not exist.')
  }
}

export const updateMeasurementById = async ({ id, weight, waist, neck, arm, thigh, date  }: Omit<Measurement, 'userId'>): Promise<Measurement> => {
  // This Measurement exists?
  if (!await existingMeasurement(id)) {
    throw new Error('This measurement does not exist')
  }

  // Object for update
  const updateData: any = {}

  if (weight !== undefined) updateData.weight = weight
  if (weight !== undefined) updateData.weight = weight
  if (waist !== undefined) updateData.waist = waist
  if (neck !== undefined) updateData.neck = neck
  if (arm !== undefined) updateData.arm = arm
  if (thigh !== undefined) updateData.thigh = thigh
  if (date !== undefined) updateData.date = date
  try {
    const updatedMeasurement = await prisma.measurement.update({
      where: { id },
      data: updateData
    })
    return updatedMeasurement
  } catch (error) {
    throw new Error('The measurement could not be updated.')
  }
}

/* Create measurement
export const createMeasurement = async ({ weight, waist, neck, arm, thigh, date, userId  }: Omit<Measurement, 'id'>): Promise<Measurement> => {
  // Verificar si ya existe una medición para este usuario en esa fecha
  const existingMeasurement = await prisma.measurement.findUnique({
    where: {
      date_userId: { date, userId } // si tienes @@unique([date, userId])
    }
  })

  if (existingMeasurement != null) {
    // Si existe, actualiza la medición
    return await updateMeasurementById({ id: existingMeasurement.id, weight, waist, neck, arm, thigh, date })
  }
  const newMeasurement = await prisma.measurement.create({
    data: { weight, waist, neck, arm, thigh, date, userId }
  })

  return newMeasurement
}
*/

// UTILS
// This user exists?
const existingUserById = async (id: number): Promise<boolean> => {
  if ((await prisma.user.findUnique({ where: { id } })) !== null) {
    return true
  }

  return false
}

export const existingMeasurement = async (id: number): Promise<boolean> => {
  if ((await prisma.measurement.findUnique({ where: { id } })) !== null) {
    return true
  }

  return false
}
