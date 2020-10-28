import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NasdaqComposite } from './../Models/NasdaqComposite';

@Injectable({
  providedIn: 'root'
})
export class NasdaqService {

  nasdaqUrl = 'http://localhost:8000/nasdaq/';
  fromDateParamKey = 'from_date';
  toDateParamKey = 'to_date';

  constructor(private httpClient: HttpClient) { }

  getNasdaqInfo(fromDate: Date, toDate: Date): Observable<NasdaqComposite[]> {
    const params = this.setHttpParams(fromDate, toDate);
    return this.httpClient.get<NasdaqComposite[]>(this.nasdaqUrl, {params});
  }

  setHttpParams(fromDate: Date, toDate: Date): HttpParams {
    let params = new HttpParams();
    params = params.append(this.fromDateParamKey, fromDate.toISOString());
    params = params.append(this.toDateParamKey, toDate.toISOString());
    console.log(params);
    return params;
  }
}
