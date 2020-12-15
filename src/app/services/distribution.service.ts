import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexData } from './../Models/IndexData';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  indexUrl = 'http://localhost:8000/top/';
  fromDateParamKey = 'from_date';
  toDateParamKey = 'to_date';
  alldata : IndexData[] = [];

  constructor(private httpClient: HttpClient) { }

  getPlainIndex(): Observable<any> {
      return this.httpClient.get<any>(this.indexUrl);

  }

  setHttpParams(fromDate: Date, toDate?: Date): HttpParams {
    let params = new HttpParams();
    params = params.append(this.fromDateParamKey, fromDate.toISOString());
    params = toDate ? params.append(this.toDateParamKey, toDate.toISOString()) : params;
    return params;
  }
}
