import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor() { }

  getExchangeRate(currency: string) {
    return 1.1;
  }
}
