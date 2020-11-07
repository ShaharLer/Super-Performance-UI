import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakoutStock } from './../models/BreakoutStock';

@Injectable({
  providedIn: 'root'
})
export class BreakoutService {

  breakoutUrl = 'http://localhost:8000/stocks/breakout/';

  constructor(private httpClient: HttpClient) { }

  getBreakouts(): Observable<BreakoutStock[]> {
    return this.httpClient.get<BreakoutStock[]>(this.breakoutUrl);
  }
}
