import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.API_URL + `/Currency`);
  }

  addCurrency(newCurrency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.API_URL + '/Currency', newCurrency);
  }

  deleteCurrency(currencyId: string) {
    let param = new HttpParams().set('id', currencyId);
    let options = { params: param };
    return this.http.delete(this.API_URL + '/Currency', options);
  }
}
