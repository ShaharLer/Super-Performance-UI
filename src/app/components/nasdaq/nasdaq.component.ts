import { Component, OnInit } from '@angular/core';
import { NasdaqComposite } from '../../models/NasdaqComposite';
import { NgxSpinnerService } from 'ngx-spinner';
import { NasdaqService } from '../../services/nasdaq.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nasdaq',
  templateUrl: './nasdaq.component.html',
  styleUrls: ['./nasdaq.component.css']
})
export class NasdaqComponent implements OnInit {

  title = 'Nasdaq Composite';
  nasdaqEntries: NasdaqComposite[];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(private calendar: NgbCalendar,
              private spinner: NgxSpinnerService,
              private nasdaqService: NasdaqService,
              public formatter: NgbDateParserFormatter) {
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
    this.getNasdaqInfo(this.convertToDateObject(this.fromDate), this.convertToDateObject(this.toDate));
  }

  convertToDateObject(date: NgbDate): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day + 1) : null;
  }

  getNasdaqInfo(fromDate: Date, toDate: Date): void {
    this.nasdaqService.getNasdaqInfo(fromDate, toDate).subscribe(
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
