require('dotenv').config();

import express, { Express, Request, Response } from "express"

import bodyParser from 'body-parser'

const app: Express = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())

app.get('/items', (request: Request, response: Response) => {
  response.send('yup')
})

app.post('/new-item', (request: Request, response: Response) => {
  response.send('yup')
})

app.patch('/item/update-item', (request: Request, response: Response) => {
  response.send('yup')
})

app.delete('/item/delete-item', (request: Request, response: Response) => {
  response.send('yup')
})

app.listen(port, async () => {
  console.log(`I'm listening on port ${port}`)
})