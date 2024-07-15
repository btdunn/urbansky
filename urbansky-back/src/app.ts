require('dotenv').config();

import express, { Express, Request, Response } from "express"

import bodyParser from 'body-parser'
import cors from 'cors';
import { router } from './router/index'

const app: Express = express()
const port = process.env.PORT || 3001

let corsOptions = {
  // i know this is bad, but i was running out of time and needed to just fold on this issue. below is what i wanted to use + this origin being the localhost:3000 address specifically but it just wouldn't take.
  origin : "*",
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
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