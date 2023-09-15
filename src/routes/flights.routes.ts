import express from 'express';
import { Request, Response } from 'express';
import FlightService from '../services/flight.service';
import CurrencyService from '../services/currency.service';

const router = express.Router();

router.get('/flights', async (req: Request, res: Response) => {
  const currency: string = req.query.currency as string;
  const date: string = req.query.date as string;

  if (currency === undefined) {
    res.status(400);
    res.send({
      'code': 'CURRENCY_IS_MANDATORY',
      'message': 'Currency must be specified in the query'
    });
    return;
  }

  if (date === undefined) {
    res.status(400);
    res.send({
      'code': 'DATE_IS_MANDATORY',
      'message': 'Date must be specified in the query'
    });
    return;
  }

  try {
    const flights = await FlightService.getFlights(currency, date);
    res.send(flights);
  } catch (e) {
    res.send({
      'code': 'ERROR',
      'message': e
    });
  }
});


router.get('/flights/currencies', async (req: Request, res: Response) => {
    console.log(req)
    res.send(await CurrencyService.getAllCurrencies());
  });

export default router;