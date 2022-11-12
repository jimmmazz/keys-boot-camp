/* eslint-disable no-undef */
import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import router from './router/index.js'

dotenv.config()

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.use('/api', router)

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () =>
      console.log(
        `Connected to dB and server running on port ${process.env.PORT}`
      )
    )
  )
