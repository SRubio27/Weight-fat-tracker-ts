import { deleteMeasurementByIdController, deleteMeasurementsByUserIdController, getAllMeasurementsController, getMeasurementByIdController, getMeasurementsByDateRangeAndUserIdController, getMeasurementsByUserIdController, getUserMeasurementByDateController } from '@controllers/measurements.controllers'
import express from 'express'

const router = express.Router()

// GET
router.get('/', getAllMeasurementsController)
router.get('/userId/:userId', getMeasurementsByUserIdController)
router.get('/id/:id', getMeasurementByIdController)
router.get('/userId/:userId/date/:date', getUserMeasurementByDateController)
router.get('/userId/:userId/from/:fromDate/to/:toDate', getMeasurementsByDateRangeAndUserIdController)

// POST
router.post('/delete/userId/:userId', deleteMeasurementsByUserIdController)
router.post('/delete/id/:id', deleteMeasurementByIdController)
// router.post('/delete/date/:date', deleteMeasurementByDateController)
// router.post('/update/id/:id, updateMeasurementByIdController)
// router.post(')
export default router
