import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NasdaqComposite } from '../../models/NasdaqComposite';
import { NgxSpinnerService } from 'ngx-spinner';
import { NasdaqService } from '../../services/nasdaq.service';
import * as constatnts from '../nasdaq-constants';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent {

  title = 'Nasdaq Composite';
  nasdaqEntries$: Observable<NasdaqComposite[]>;
  serverError: boolean;

  constructor(private spinner: NgxSpinnerService, private nasdaqService: NasdaqService) { }

  getNasdaqInfoByDates(datesMap: Map<string, Date>): void {
    const fromDate = datesMap.get(constatnts.FROM_DATE_KEY);
    const toDate = datesMap.get(constatnts.TO_DATE_KEY);
    this.getNasdaqInfo(fromDate, toDate);
  }

  getNasdaqInfo(fromDate: Date, toDate: Date): void {
    this.serverError = false;
    this.spinner.show();
    this.nasdaqEntries$ = this.nasdaqService.getNasdaqInfo(fromDate, toDate)
      .pipe(
        catchError(err => {
          console.error(err);
          this.serverError = true;
          return [];
        }),
        finalize(() => this.spinner.hide())
      );
  }
}
