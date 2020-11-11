import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicallyValidStock } from '../models/TechnicallyValidStock';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class TechnicalService {

  prefixUrl = 'http://localhost:8000/';
  technicallyValidStocksUrl = `${this.prefixUrl}stocks/technically-valid/`;
  pivotUrl = `${this.prefixUrl}pivot/`;
  symbolParamKey = 'symbol';
  pivotParamKey = 'pivot';

  constructor(private httpClient: HttpClient) { }

  getTechnicallyValidStocks(): Observable<TechnicallyValidStock[]> {
    return this.httpClient.get<TechnicallyValidStock[]>(this.technicallyValidStocksUrl);
  }

  updateStockPivot(symbol: string, pivotValue: number): Observable<any> {
    const body = this.setBody(symbol, pivotValue);
    return this.httpClient.put<any>(this.pivotUrl, body, {headers});
  }

  setBody(symbol: string, pivotValue: number): Map<string, string> {
    const body = new Map<string, string>();
    body[this.symbolParamKey] = symbol;
    body[this.pivotParamKey] = pivotValue.toString();
    return body;
  }

  removeTechnicalStock(symbol: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.pivotUrl}${symbol}/`);
  }
}
