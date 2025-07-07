import { deleteMeasurementById, deleteMeasurementsByUserId, getAllMeasurements, getMeasurementById, getMeasurementsByDateRangeAndUserId, getMeasurementsByUserId, getUserMeasurementByDate, updateMeasurementById } from '@services/measurements.services'
import { parseValidDate } from '@utils/date.utils'
import { Request, Response } from 'express'

//  #########
//  ###GET###
//  #########

// Obtain all measurements
export const getAllMeasurementsController = async (_req: Request, res: Response): Promise<any> => {
  try {
    const measurements = getAllMeasurements
    res.status(200).json(measurements)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// Obtain all measurements of one user
export const getMeasurementsByUserIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const measurements = await getMeasurementsByUserId(parseInt(req.params.userId))
    res.status(200).json(measurements)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// Obtain a measurement by id
export const getMeasurementByIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const measurement = await getMeasurementById(parseInt(req.params.id))
    res.status(200).json(measurement)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// Obtain a user measurement by date
export const getUserMeasurementByDateController = async (req: Request, res: Response): Promise<any> => {
  try {
    const measurement = await getUserMeasurementByDate(
      new Date(req.params.date),
      parseInt(req.params.userId)
    )

    res.status(200).json(measurement)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// Obtain user measurements within a date range
export const getMeasurementsByDateRangeAndUserIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.userId)
    const fromDate = new Date(req.params.fromDate)
    const toDate = new Date(req.params.toDate)

    // Basic date validation
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD or a valid date string.' })
    }

    const measurements = await getMeasurementsByDateRangeAndUserId(userId, fromDate, toDate)

    res.status(200).json(measurements)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error retrieving measurements by date range.' })
    }
  }
}

//  ##########
//  ###POST###
//  ##########

// Delete all measurements from a user
export const deleteMeasurementsByUserIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const measurement = await deleteMeasurementsByUserId(parseInt(req.params.userId))
    res.status(200).json(measurement)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// Delete a measurement
export const deleteMeasurementByIdController = async (req: Request, res: Response): Promise<any> => {
  try {
    const measurement = await deleteMeasurementById(parseInt(req.params.id))
    res.status(200).json(measurement)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
  }
}

// PUT

// Update a measurement
export const updateMeasurementByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  let { weight, waist, neck, arm, thigh, date } = req.body
  if (date !== undefined) date = parseValidDate(date)

  try {
    const updatedMeasurement = await updateMeasurementById({ id: +id, weight, waist, neck, arm, thigh, date })
    res.status(200).json(updatedMeasurement)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

/* Create a measurement
export const createMeasurementController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params
  let { weight, waist, neck, arm, thigh, date } = req.body
  if (date !== undefined) date = parseValidDate(date)

  try {
    const measurement = await createMeasurement({
      weight: Number(weight),
      waist: waist !== undefined ? Number(waist) : null,
      neck: neck !== undefined ? Number(neck) : null,
      arm: arm !== undefined ? Number(arm) : null,
      thigh: thigh !== undefined ? Number(thigh) : null,
      date,
      userId: Number(userId)
    })
    res.status(200).json(measurement)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
*/
