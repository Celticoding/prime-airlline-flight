import express, { Application, Request, Response } from 'express'
import flightRouter from './routes/flights.routes';
import cors from 'cors';

const app: Application = express()

const port: number = 8081


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(flightRouter);

app.get('/health', (_, res: Response) => {
    res.sendStatus(200)
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})