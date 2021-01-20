import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TechnicallyValidStock } from '../../../models/TechnicallyValidStock';
import { NgxSpinnerService } from 'ngx-spinner';
import { TechnicalService } from '../../../services/technical.service';
import { finalize } from 'rxjs/operators';
import * as sharedConstatnts from '../../shared-constants';

@Component({
  selector: 'app-technically-valid-main',
  templateUrl: './technically-valid-main.component.html',
  styleUrls: ['./technically-valid-main.component.css']
})
export class TechnicallyValidMainComponent implements OnInit {

  tableHeaders = ['symbol', 'name', 'pivot', 'stock charts'];
  technicallyValidStocks: TechnicallyValidStock[];
  stockChartsUrl = sharedConstatnts.STOCK_CHARTS_URL;
  updatedPivots = new Map<string, number>();
  showModal = false;
  dbUpdateSucceded: boolean;
  modalBody: string;
  serverError: boolean;
  spinnerText: string;
  stockToRemove: string;

  @ViewChild('modal') modal: ElementRef;

  constructor(private spinner: NgxSpinnerService,
              private technicalService: TechnicalService) { }

  ngOnInit(): void {
    this.getTechnicallyValidStocks();
  }

  getTechnicallyValidStocks(): void {
    this.beforeFetchingStocks();
    this.technicalService.getTechnicallyValidStocks()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (data: TechnicallyValidStock[]) => this.updateTechnicallyValidStocks(data),
        () => this.serverError = true
      );
  }

  updateTechnicallyValidStocks(data: TechnicallyValidStock[]): void {
    this.technicallyValidStocks = data;
    data.map(stock => this.updatedPivots[stock.symbol] = stock.pivot);
  }

  isSaveDisabled(symbol: string, pivotInput: any): boolean {
    const pivot = Number(pivotInput.value);
    return pivotInput.disabled || (this.isPivotValid(pivot) && pivot === this.updatedPivots[symbol]);
  }

  isCancelDisabled(pivotInput: any): boolean {
    return pivotInput.disabled;
  }

  onUpdateClicked(pivotInput: any): void {
    pivotInput.disabled = false;
    pivotInput.focus();
  }

  onCancelClicked(symbol: string, pivotInput: any): void {
    pivotInput.value = this.updatedPivots[symbol];
    pivotInput.disabled = true;
  }

  onSaveClicked(symbol: string, pivotInput: any): void {
    if (!this.isPivotValid(Number(pivotInput.value))) {
      const message = 'Error: Cannot update {0} - pivot must be a float number (the given value was {1})';
      this.pivotUpdateFailed(symbol, pivotInput, message);
    } else {
      this.updatePivot(symbol, pivotInput);
    }
  }

  isPivotValid(pivot: number): boolean {
    return !(isNaN(pivot));
  }

  updatePivot(symbol: string, pivotInput: any): void {
    this.beforeUpdatingPivot();
    this.technicalService.updateStockPivot(symbol, Number(pivotInput.value))
      .pipe(finalize(() => this.spinner.hide() ))
      .subscribe(
        () => this.pivotUpdateSucceeded(symbol, pivotInput),
        () => {
                const message = 'Error: Failed to update {0} with pivot {1} in the DB, try again later';
                this.pivotUpdateFailed(symbol, pivotInput, message);
              }
      );
  }

  onRemoveClicked(symbol: string): void {
    const message = 'Are you sure you want to remove {0} from the list?';
    const formattedMessage = this.formatString([symbol], message);
    this.stockToRemove = symbol;
    this.openModal(formattedMessage);
  }

  onRemoveConfirmationClicked(): void {
    const stockToRemove = this.stockToRemove;
    this.afterRemoveAlert();
    this.removeStockFromTechnicalList(stockToRemove);
  }

  removeStockFromTechnicalList(stockToRemove: string): void {
    this.beforeRemovingTechnicalStock();
    this.technicalService.removeTechnicalStock(stockToRemove)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        () => this.removedTechinicalStockSuccesfully(stockToRemove),
        () => this.removingTechinicalStockFailed(stockToRemove)
      );
  }

  removedTechinicalStockSuccesfully(stockToRemove: string): void {
    this.technicallyValidStocks = this.technicallyValidStocks.filter(stock => stock.symbol !== stockToRemove);
  }

  removingTechinicalStockFailed(stockToRemove: string): void {
    const message = 'Error: Failed to remove {0} from the techincally valid stocks in the DB, try again later';
    const formattedMessage = this.formatString([stockToRemove], message);
    this.openModal(formattedMessage);
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
    const message = 'DB was updated succesfully ({0} : {1})';
    const formattedMessage = this.formatString([symbol, pivotInput.value], message);
    this.dbUpdateSucceded = true;
    this.updatedPivots[symbol] = Number(pivotInput.value);
    this.execModalAfterSavedClicked(formattedMessage, pivotInput);
  }

  pivotUpdateFailed(symbol: string, pivotInput: any, bodyMessage: string): void {
    const message = this.formatString([symbol, pivotInput.value], bodyMessage);
    this.dbUpdateSucceded = false;
    pivotInput.value = this.updatedPivots[symbol];
    this.execModalAfterSavedClicked(message, pivotInput);
  }

  formatString(args: string[], str: string): string {
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
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }

  modalClassType(): object {
    if (this.dbUpdateSucceded && !this.stockToRemove) {
      return {'db-update-success': true};
    } else {
      return {'db-update-failure': true};
    }
  }
}
