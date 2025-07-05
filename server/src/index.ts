import express from 'express'

import measurementRouter from './routes/measurement.routes'
import userRouter from './routes/user.routes'
const app = express()
app.use(express.json()) // Middleware to parse JSON bodies

const PORT = 3000

// ENDPOINTS
app.get('/ping', (_req, res) => {
  res.send('Someone pinged me!')
})

//
app.use('/api/user', userRouter)
app.use('/api/measurement', measurementRouter)

// LISTENERS
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
