import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreakoutService } from './../../services/breakout.service';
import { BreakoutStock } from './../../models/BreakoutStock';
import { finalize, catchError } from 'rxjs/operators';
import * as sharedConstatnts from '../shared-constants';

@Component({
  selector: 'app-breakout',
  templateUrl: './breakout.component.html',
  styleUrls: ['./breakout.component.css']
})
export class BreakoutComponent implements OnInit {

  stockChartsUrl = sharedConstatnts.STOCK_CHARTS_URL;
  tableHeaders = ['symbol', 'name', 'pivot', 'stock charts'];
  breakoutStocks$: Observable<BreakoutStock[]>;
  serverError: boolean;

  constructor(private spinner: NgxSpinnerService, private breakoutService: BreakoutService) { }

  ngOnInit(): void {
    this.getBreakoutStocks();
  }

  getBreakoutStocks(): void {
    this.beforeCallToServer();
    this.getBreakoutStocksFromServer();
  }

  beforeCallToServer(): void {
    this.serverError = false;
    this.spinner.show();
  }

  getBreakoutStocksFromServer(): void {
    this.breakoutStocks$ = this.breakoutService.getBreakouts()
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
