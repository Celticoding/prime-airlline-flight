import axios from 'axios';
import FlightDto from '../dtos/flight.dto';
import DiscountDto from '../dtos/discount.dto';


class DiscountService {

  static async getDiscountForFlights(flights: FlightDto[]): Promise<FlightDto[]> {
    const response = await axios.get(DATA_ACCES_API + "/discounts")
    const discountsFromDb = response.data;
    
    return await Promise.all(flights.map( async (flight) => {
      const price = flight.price;
      const discounts = await Promise.all(discountsFromDb.filter((discount: DiscountDto) => discount.originalFlightId === flight.id)
        .map(async(discount: DiscountDto) => {
            delete discount.originalFlightId
            const discountedFlight = await axios.get(DATA_ACCES_API + "/flight/"+discount.flightId)
            delete discount.flightId
            const discountPrice = +(price - (price * (discount.percent / 100))).toFixed(2);
            return { ...discount, discountPrice, flight: discountedFlight.data };
        }));
      return { ...flight, discounts } as FlightDto;
    }));
  }
}

export default DiscountService;