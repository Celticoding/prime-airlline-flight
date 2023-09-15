
import DiscountDto from './discount.dto';
import MealDto from './meal.dto';

interface FlightDto {
  id: number, 
  airportDeparture: string, 
  airportArrival: string, 
  seats: number, 
  price: number, 
  date?: string, 
  discounts?: DiscountDto[], 
  isLongDuration?: boolean, 
  meals?: MealDto[], 
  planeId: number
}

export default FlightDto;