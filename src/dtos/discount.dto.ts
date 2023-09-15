interface DiscountDto {
    flightId?: number, 
    escale: string,
    percent: number,
    discountPrice?: number
  }
  
  export default DiscountDto;