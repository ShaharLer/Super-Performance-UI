import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilteredStock } from './../models/FilteredStock';
import * as sharedConstatnts from './../components/shared-constants';

@Injectable({
  providedIn: 'root'
})
export class StocksFilterService {

  prefixUrl = 'http://localhost:8000/';
  filtersUrl = `${this.prefixUrl}filters/`;
  filteredStocksUrl = `${this.prefixUrl}filter_stocks/`;

  constructor(private httpClient: HttpClient) { }

  getFilters(): Observable<any> {
    return this.httpClient.get<any>(this.filtersUrl);
  }

  getFilteredStocks(filters: Map<String, String>): Observable<FilteredStock[]> {
    const params = this.setHttpParams(filters);
    return this.httpClient.get<FilteredStock[]>(this.filteredStocksUrl, {params});
  }

  setHttpParams(filters: Map<String, String>): HttpParams {
    let params = new HttpParams();
    if (sharedConstatnts.STOCK_SYMBOL in filters) {
      params = params.append(sharedConstatnts.STOCK_SYMBOL, filters[sharedConstatnts.STOCK_SYMBOL]);
    }
    if (sharedConstatnts.EPS_GROWTH_THRESHOLD_Q in filters) {
      params = params.append(sharedConstatnts.EPS_GROWTH_THRESHOLD_Q, filters[sharedConstatnts.EPS_GROWTH_THRESHOLD_Q]);
    }
    if (sharedConstatnts.EPS_GROWTH_THRESHOLD_Y in filters) {
      params = params.append(sharedConstatnts.EPS_GROWTH_THRESHOLD_Y, filters[sharedConstatnts.EPS_GROWTH_THRESHOLD_Y]);
    }
    if (sharedConstatnts.EPS_GROWTH_QUARTERS in filters) {
      params = params.append(sharedConstatnts.EPS_GROWTH_QUARTERS, filters[sharedConstatnts.EPS_GROWTH_QUARTERS]);
    }
    if (sharedConstatnts.EPS_GROWTH_YEARS in filters) {
      params = params.append(sharedConstatnts.EPS_GROWTH_YEARS, filters[sharedConstatnts.EPS_GROWTH_YEARS]);
    }
    if (sharedConstatnts.ACCELERATION_QUARTERS in filters) {
      params = params.append(sharedConstatnts.ACCELERATION_QUARTERS, filters[sharedConstatnts.ACCELERATION_QUARTERS]);
    }
    if (sharedConstatnts.ACCELERATION_YEARS in filters) {
      params = params.append(sharedConstatnts.ACCELERATION_YEARS, filters[sharedConstatnts.ACCELERATION_YEARS]);
    }
    if (sharedConstatnts.SALES_GROWTH_THRESHOLD in filters) {
      params = params.append(sharedConstatnts.SALES_GROWTH_THRESHOLD, filters[sharedConstatnts.SALES_GROWTH_THRESHOLD]);
    }
    return params;
  }
}
