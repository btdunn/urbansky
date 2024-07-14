require('dotenv').config();

import express, { Express, Request, Response } from "express"

import bodyParser from 'body-parser'
import { router } from './router/index'

const app: Express = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use('/api', router)

app.listen(port, async () => {
  console.log(`I'm listening on port ${port}`)
})