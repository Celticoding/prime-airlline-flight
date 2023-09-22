import axios, { AxiosResponse } from 'axios';
import FlightDto from '../dtos/flight.dto';
import DiscountDto from '../dtos/discount.dto';
import FlightService from './flight.service';


class DiscountService {

  static async getDiscountForFlights(flights: FlightDto[]): Promise<FlightDto[]> {
    const response = await axios.get(DATA_ACCES_API + "/discounts")
    const discountsFromDb = response.data;
    
    return await Promise.all(flights.map( async (flight) => {
      const price = flight.price;
      const discounts = await Promise.all(discountsFromDb.filter((discount: DiscountDto) => discount.originalFlightId === flight.id)
        .map(async(discount: DiscountDto) => {
            delete discount.originalFlightId
            let discountedFlightResponse: AxiosResponse<any, any> = await axios.get(DATA_ACCES_API + "/flight/"+discount.flightId)
            const discountedFlight: FlightDto = discountedFlightResponse.data
            delete discount.flightId
            const discountPrice = +(price - (price * (discount.percent / 100))).toFixed(2);
            discountedFlight.date =  flight.date!;
            discountedFlight.seats =  await FlightService.getAvailableSeats(discountedFlight.id, flight.date!);

            let updatedFlight = {...flight}
            updatedFlight = {...updatedFlight, ...discountedFlight}
            return { ...discount, discountPrice, flight: updatedFlight };
        }));
      return { ...flight, discounts } as FlightDto;
    }));
  }
}

export default DiscountService;