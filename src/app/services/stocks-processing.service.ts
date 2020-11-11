import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class StocksProcessingService {

  prefixUrl = 'http://localhost:8000/';
  backgroundManagerUrl = `${this.prefixUrl}background/`;
  scrapperUrl = `${this.prefixUrl}scrapper/`;
  raterUrl = `${this.prefixUrl}rater/`;
  technicalAnalysisUrl = `${this.prefixUrl}technical/`;
  breakoutDetectionUrl = `${this.prefixUrl}breakout/`;
  passwordParamKey = 'password';

  constructor(private httpClient: HttpClient) { }

  runBackgroundManager(): Observable<any> {
    return this.httpClient.get<any>(this.backgroundManagerUrl);
  }

  runScrapper(): Observable<any> {
    return this.httpClient.get<any>(this.scrapperUrl);
  }

  runRater(): Observable<any> {
    return this.httpClient.get<any>(this.raterUrl);
  }

  runTechnicalAnalysis(): Observable<any> {
    return this.httpClient.get<any>(this.technicalAnalysisUrl);
  }

  runBreakoutDetection(password: string): Observable<any> {
    const body = this.setBody(password);
    return this.httpClient.post<any>(this.breakoutDetectionUrl, body, {headers});
  }

  setBody(password: string): Map<string, string> {
    const body = new Map<string, string>();
    body[this.passwordParamKey] = password;
    return body;
  }
}
