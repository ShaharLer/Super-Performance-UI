import { Component, OnInit } from '@angular/core';
import { TechnicallyValidStock } from './../../models/TechnicallyValidStock';
import { NgxSpinnerService } from 'ngx-spinner';
import { StocksProcessingService } from '../../services/stocks-processing.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-technically-valid',
  templateUrl: './technically-valid.component.html',
  styleUrls: ['./technically-valid.component.css']
})
export class TechnicallyValidComponent implements OnInit {

  technicallyValidStocks: TechnicallyValidStock[];
  tableHeaders = ['symbol', 'name', 'pivot', 'stock charts'];
  stockChartsUrl = 'https://stockcharts.com/h-sc/ui?s=';
  updatedPivots = new Map<string, number>();
  updatedStockSuccessfullyMessage = 'DB was updated succesfully ({0} : {1})';
  updateFailedMessage = 'Error: Failed to update {0} with pivot {1} in the DB, please try again later';
  wrongPivotType = 'Error: Cannot update {0} - pivot must be a float number (the given value was {1})';
  verifyRemovingStockMessage = 'Are you sure you want to remove {0} from the list?';
  removingStockFailedMessage = 'Error: Failed to remove {0} from the techincally valid stocks in the DB, please try again later';
  showModal = false;
  dbUpdateSucceded: boolean;
  modalBody: string;
  serverError: boolean;
  spinnerText: string;
  stockToRemove: string;

  constructor(private spinner: NgxSpinnerService,
              private stocksProcessingService: StocksProcessingService) { }

  ngOnInit(): void {
    this.getTechnicallyValidStocks();
  }

  getTechnicallyValidStocks(): void {
    this.beforeFetchingStocks();
    this.stocksProcessingService.getTechnicallyValidStocks()
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        (data: TechnicallyValidStock[]) => this.updateTechnicallyValidStocks(data),
        () => this.onTechnicallyValidStockFetchFailed()
      );
  }

  updateTechnicallyValidStocks(data: TechnicallyValidStock[]): void {
    this.technicallyValidStocks = data;
    data.map(stock => this.updatedPivots[stock.symbol] = stock.pivot);
  }

  onTechnicallyValidStockFetchFailed(): void {
    this.serverError = true;
  }

  isSaveDisabled(symbol: string, pivotInput: any): boolean {
    const pivot = Number(pivotInput.value);
    return pivotInput.disabled || (this.isPivotValid(pivot) && pivot === this.updatedPivots[symbol]);
  }

  isCancelDisabled(pivotInput: any): boolean {
    return pivotInput.disabled;
  }

  onUpdateClicked(pivotInput: any, symbol: string): void {
    pivotInput.disabled = false;
    pivotInput.focus();
  }

  onCancelClicked(symbol: string, pivotInput: any): void {
    pivotInput.value = this.updatedPivots[symbol];
    pivotInput.disabled = true;
  }

  onSaveClicked(symbol: string, pivotInput: any): void {
    if (!this.isPivotValid(Number(pivotInput.value))) {
      this.pivotUpdateFailed(symbol, pivotInput, this.wrongPivotType);
    } else {
      this.updatePivot(symbol, pivotInput);
    }
  }

  isPivotValid(pivot: number): boolean {
    return !(isNaN(pivot));
  }

  updatePivot(symbol: string, pivotInput: any): void {
    this.beforeUpdatingPivot();
    this.stocksProcessingService.updateStockPivot(symbol, Number(pivotInput.value))
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        () => this.pivotUpdateSucceeded(symbol, pivotInput),
        () => this.pivotUpdateFailed(symbol, pivotInput, this.updateFailedMessage)
      );
  }

  onRemoveClicked(symbol: string): void {
    const message = this.formatString(this.verifyRemovingStockMessage, [symbol]);
    this.stockToRemove = symbol;
    this.openModal(message);
  }

  onRemoveConfirmationClicked(): void {
    const stockToRemove = this.stockToRemove;
    this.afterRemoveAlert();
    this.removeStockFromTechnicalList(stockToRemove);
  }

  removeStockFromTechnicalList(stockToRemove: string): void {
    this.beforeRemovingTechnicalStock();
    this.stocksProcessingService.removeTechnicalStock(stockToRemove)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(
        () => this.removedTechinicalStockSuccesfully(stockToRemove),
        () => this.removingTechinicalStockFailed(stockToRemove)
      );
  }

  removedTechinicalStockSuccesfully(stockToRemove: string): void {
    this.technicallyValidStocks = this.technicallyValidStocks.filter(stock => stock.symbol !== stockToRemove);
  }

  removingTechinicalStockFailed(stockToRemove: string): void {
    const message = this.formatString(this.removingStockFailedMessage, [stockToRemove]);
    this.openModal(message);
  }

  afterRemoveAlert(): void {
    this.stockToRemove = undefined;
    this.closeModal();
  }

  beforeFetchingStocks(): void {
    this.serverError = false;
    this.spinnerText = 'Loading...';
    this.showSpinner();
  }

  beforeUpdatingPivot(): void {
    this.spinnerText = 'Saving...';
    this.showSpinner();
  }

  beforeRemovingTechnicalStock(): void {
    this.spinnerText = 'Removing...';
    this.showSpinner();
  }

  showSpinner(): void {
    this.spinner.show();
  }

  pivotUpdateSucceeded(symbol: string, pivotInput: any): void {
    const message = this.formatString(this.updatedStockSuccessfullyMessage, [symbol, pivotInput.value]);
    this.dbUpdateSucceded = true;
    this.updatedPivots[symbol] = Number(pivotInput.value);
    this.execModalAfterSavedClicked(message, pivotInput);
  }

  pivotUpdateFailed(symbol: string, pivotInput: any, bodyMessage: string): void {
    const message = this.formatString(bodyMessage, [symbol, pivotInput.value]);
    this.dbUpdateSucceded = false;
    pivotInput.value = this.updatedPivots[symbol];
    this.execModalAfterSavedClicked(message, pivotInput);
  }

  formatString(str: string, args: string[]): string {
    for (let i = 0; i < args.length; i++) {
      str = str.replace('{' + i + '}', args[i]);
    }
    return str;
  }

  execModalAfterSavedClicked(bodyMessage: string, pivotInput: any): void {
    pivotInput.disabled = true;
    this.openModal(bodyMessage);
  }

  openModal(bodyMessage: string): void {
    this.modalBody = bodyMessage;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
