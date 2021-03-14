import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ExchangeRequest } from './DTOs/exchange-request.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private readonly API_URL = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  getExchangeValue(exchangeRequest: ExchangeRequest): Observable<number> {

    return this.http.post<number>(this.API_URL + '/Exchange/CalculateExchangeValue', exchangeRequest)
      .pipe(
        retry(2),
        catchError(this.getError)
      );
  }

  private getError(error) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // handle client-side errors
      message = `Error: ${error.error.message}`;
    } else {
      // handle server-side errors
      message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(message);

    return throwError(message);
  }
}
