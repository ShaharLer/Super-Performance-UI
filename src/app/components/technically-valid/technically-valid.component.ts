import { Component, OnInit } from '@angular/core';
import { TechnicallyValidStock } from './../../models/TechnicallyValidStock';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksProcessingService } from '../../services/stocks-processing.service';
import { Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { type } from 'os';

@Component({
  selector: 'app-technically-valid',
  templateUrl: './technically-valid.component.html',
  styleUrls: ['./technically-valid.component.css']
})
export class TechnicallyValidComponent implements OnInit {

  technicallyValidStocks$: Observable<TechnicallyValidStock[]>;
  tableHeaders = ['symbol', 'name', 'pivot', 'stock charts'];
  stockChartsUrl = 'https://stockcharts.com/h-sc/ui?s=';
  serverError: boolean;

  constructor(private spinner: NgxSpinnerService,
              private stocksProcessingService: StocksProcessingService) { }

  ngOnInit(): void {
    this.getTechnicallyValidStocks();
  }

  getTechnicallyValidStocks(): void {
    this.serverError = false;
    this.spinner.show();
    this.technicallyValidStocks$ = this.stocksProcessingService.getTechnicallyValidStocks()
      .pipe(
        catchError(err => {
          console.error(err);
          this.serverError = true;
          return [];
        }),
        finalize(() => this.spinner.hide())
      );
  }

  onUpdateClicked(pivotInput: any): void {
    pivotInput.disabled = false;
  }

  onSaveClicked(symbol: string, pivotInput: any): void {
    if (isNaN(Number(pivotInput.value))) {
      console.log('NaN');
    } else {
      this.stocksProcessingService.updateStockPivot(symbol, pivotInput.value)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
      pivotInput.disabled = true;
    }
  }
}
