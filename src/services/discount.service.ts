import axios from 'axios';
import FlightDto from '../dtos/flight.dto';


class DiscountService {

  static async getDiscountForFlights(flights: FlightDto[]): Promise<FlightDto[]> {
    const response = await axios.get(DATA_ACCES_API + "/discounts")
    const discountsFromDb = response.data;
    
    return flights.map(flight => {
      const price = flight.price;
      const discounts = discountsFromDb.filter((discount: { flightId: number; }) => discount.flightId === flight.id)
        .map((discount: { percent: number; }) => {
            const discountPrice = +(price - (price * (discount.percent / 100))).toFixed(2);
            return { ...discount, discountPrice };
        });
      return { ...flight, discounts, 'titi': 'toto' } as FlightDto;
    });
  }
}

export default DiscountService;