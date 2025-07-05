
export interface User {
  id: number
  name: string
  email: string
  password: string
}

export type NonIdUser = Omit<User, 'id'>

export interface Measurement {
  id: number
  weight: number
  waist: number
  neck: number
  arm: number
  thigh: number
  date: Date
  userId: number
}

export type NonMeasurementsEntry = Pick<Measurement, 'id' | 'weight' | 'Date' | 'userId'>
