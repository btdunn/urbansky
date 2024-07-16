require('dotenv').config();

import express, { Express, Request, Response } from "express"

import bodyParser from 'body-parser'
import cors from 'cors';
import { router } from './router/index'

const app: Express = express()
const port = process.env.PORT || 3001

// let corsOptions = {
//   origin : "http://localhost:3000",
//   optionsSuccessStatus: 200,
// }

app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.listen(port, async () => {
  console.log(`I'm listening on port ${port}`)
})

export default app