import axios from 'axios';
import CurrencyDto from '../dtos/currency.dto';

class CurrencyService {

  static async getAllCurrencies(): Promise<CurrencyDto[]> {
    const response =  await axios.get(DATA_ACCES_API + "/currencies");
    return response.data;
  }

  static async getCurrencyRate(currencyFromRequest: string): Promise<string | null> {
    const currencies = await CurrencyService.getAllCurrencies();
    const foundCurrency = currencies.find(currencyToLoop => {
        return currencyToLoop.currency == currencyFromRequest; });
    if (!foundCurrency)
      return null;
    return foundCurrency.rate;
  }

}

export default CurrencyService;