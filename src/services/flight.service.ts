import axios from 'axios';
import CurrencyService from './currency.service';
import FlightDto from '../dtos/flight.dto';
import DiscountService from './discount.service';
import Global from '../types/index';

class FlightService {

    static async getFlights(currency: string, date: string): Promise<FlightDto[]> {
        const flightsFromDb = await FlightService.getFlightsFromDataAccessService();

        const currencyRate = await CurrencyService.getCurrencyRate(currency);
        if (currencyRate == null)
            throw 'invalid currency';
            
        const flights = await Promise.all(flightsFromDb.map(async flight => {
            const newPrice = +(flight.price * +currencyRate).toFixed(2);

            const seats = await FlightService.getAvailableSeats(flight.id, date);
            const newFlight = FlightService.createNewFlight(flight, { price: newPrice, date, seats });
            return newFlight;
        }));

        return DiscountService.getDiscountForFlights(flights);
    }

    static async getAvailableSeats(flightId: number, date: string): Promise<number> {
        const params = { params: {
            flightId: flightId,
            date: date
        }}
        const response = await axios.get(DATA_ACCES_API + "/flights/available-seats", params);
        return response.data.flight;
    }

    static createNewFlight(flight: FlightDto, data: Partial<FlightDto>): FlightDto {
        return {
            ...flight,
            ...data
        } as FlightDto;
    }

    static async getFlightsFromDataAccessService(): Promise<FlightDto[]> {
        const response = await axios.get(Global.DATA_ACCES_API + "/flights");
        return response.data;
    };

}

export default FlightService;