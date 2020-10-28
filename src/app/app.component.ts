import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NasdaqComposite } from './Models/NasdaqComposite';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nasdaq Composite';
  nasdaqEntries: NasdaqComposite[];
  tableHeaders = ['Date', 'MA(3)', 'MA(3) Change', 'MA(7)', 'MA(7) Change', 'Action'];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(private httpClient: HttpClient, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
              private spinner: NgxSpinnerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.convertDatesAndCallNasdaqInfo();
  }

  onGetNsadaqInfoClicked(): void {
    this.convertDatesAndCallNasdaqInfo();
  }

  convertDatesAndCallNasdaqInfo(): void {
    this.spinner.show();
    const convertedFromDate = this.convertToDateObject(this.fromDate);
    const convertedToDate = this.convertToDateObject(this.toDate);
    this.getNasdaqInfo(convertedFromDate, convertedToDate);
  }

  convertToDateObject(date: NgbDate): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day + 1) : null;
  }

  getNasdaqInfo(startDate: Date, endDate?: Date): void {
    let params = new HttpParams();
    params = startDate ? params.append('start_date', startDate.toISOString()) : params;
    params = endDate ? params.append('end_date', endDate.toISOString()) : params;
    console.log(params);

    this.httpClient.get<NasdaqComposite[]>('http://localhost:8000/nasdaq/', {params}).subscribe(
      (nasdaqEntries: NasdaqComposite[]) => {
        this.nasdaqEntries = nasdaqEntries;
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  onDateSelection(date: NgbDate): void {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate): boolean {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate): boolean {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): boolean {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
