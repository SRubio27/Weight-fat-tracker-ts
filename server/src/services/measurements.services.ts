import { prisma } from '../db'

//  #########
//  ###GET###
//  #########

// Obtain all measurements
export const getAllMeasurements = prisma.measurement.findMany()

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
  const measurement = await prisma.measurement.delete({
    where: { id }
  })
  if (measurement === null) {
    throw new Error('This measurement id doesnt exist.')
  }

  return measurement
}

// This user exists?
const existingUserById = async (id: number): Promise<boolean> => {
  if ((await prisma.user.findUnique({ where: { id } })) != null) {
    return true
  }

  return false
}
