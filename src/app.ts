import express, { Application, Request, Response } from 'express'
import flightRouter from './routes/flights.routes';

const app: Application = express()

const port: number = 8081

app.use(flightRouter);

app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})