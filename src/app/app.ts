import express, { Application, Request, Response } from 'express';
import cors from 'cors'

const app: Application = express()

// body perser middlewere
app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response)=>{
    res.send("welcome to level 2 assingment 2");
})

export default app