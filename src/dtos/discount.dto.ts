interface DiscountDto {
    originalFlightId?: number,
    flightId?: number, 
    percent: number,
    discountPrice?: number
  }
  
  export default DiscountDto;