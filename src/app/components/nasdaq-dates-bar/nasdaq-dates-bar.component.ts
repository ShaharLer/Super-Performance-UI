import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as constatnts from '../nasdaq-constants';

@Component({
  selector: 'app-nasdaq-dates-bar',
  templateUrl: './nasdaq-dates-bar.component.html',
  styleUrls: ['./nasdaq-dates-bar.component.css']
})
export class NasdaqDatesBarComponent implements OnInit {

  @Output() sendDates = new EventEmitter<Map<string, Date>>();
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate | null = null;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.getNsadaqInfo();
  }

  getNsadaqInfo(): void {
    const fromDate = this.convertToDateObject(this.fromDate);
    const toDate = this.convertToDateObject(this.toDate);
    this.sendDates.emit(new Map([
      [constatnts.FROM_DATE_KEY, fromDate],
      [constatnts.TO_DATE_KEY, toDate]
    ]));
  }

  convertToDateObject(date: NgbDate): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day + 1) : null;
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
