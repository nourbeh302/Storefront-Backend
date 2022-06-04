import express, { Application, Request, Response } from "express"
import { config } from "dotenv"

config()

const app: Application = express()
const port: number = (process.env.SERVER_PORT as unknown as number) || 8001

app.get('/', (req: Request, res: Response) => res.send('Hello World'))

app.listen(port, () => console.log(`App running on port ${port}`))