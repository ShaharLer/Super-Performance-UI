import { Component } from '@angular/core';
import { NasdaqComposite } from '../../models/NasdaqComposite';
import { NgxSpinnerService } from 'ngx-spinner';
import { NasdaqService } from '../../services/nasdaq.service';
import * as constatnts from '../nasdaq-constants';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent {

  title = 'Nasdaq Composite';
  nasdaqEntries: NasdaqComposite[];

  constructor(private spinner: NgxSpinnerService, private nasdaqService: NasdaqService) { }

  getNasdaqInfoByDates(datesMap: Map<string, Date>): void {
    const fromDate = datesMap.get(constatnts.FROM_DATE_KEY);
    const toDate = datesMap.get(constatnts.TO_DATE_KEY);
    this.getNasdaqInfo(fromDate, toDate);
  }

  getNasdaqInfo(fromDate: Date, toDate: Date): void {
    this.spinner.show();
    this.nasdaqService.getNasdaqInfo(fromDate, toDate).subscribe(
      (nasdaqEntries: NasdaqComposite[]) => this.updateNasdaqEntries(nasdaqEntries),
      error => this.onError(error)
    );
  }

  updateNasdaqEntries(nasdaqEntries: NasdaqComposite[]): void {
    this.nasdaqEntries = nasdaqEntries;
    this.hideSpinner();
  }

  onError(error: any): void {
    console.log(error);
    this.hideSpinner();
  }

  hideSpinner(): void {
    this.spinner.hide();
  }
}
