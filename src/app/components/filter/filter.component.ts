import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StocksFilterService } from './../../services/stocks-filter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { FilteredStock } from './../../models/FilteredStock';
import * as constatnts from './../shared-constants';
import { constants } from 'buffer';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements AfterViewInit {

  modalBody: string;
  epsGrowthThresholdQ: Number;
  epsGrowthThresholdY: Number;
  salesGrowthThreshold: Number;
  quartersGrowthToFollow = [2, 3, 4];
  quartersAccelerationToFollow = [2, 3, 4];
  yearsGrowthToFollow = [2, 3, 4];
  yearsAccelerationToFollow = [2, 3, 4];
  tableHeaders = ['Symbol', 'Name', 'Sector', 'Industry', 'P/S', 'Stock Charts'/*, 'Sector ETF'*/, 'Sector stage analysis', 'Short & Volume', 'Institutional ownership', 'Mansfields RS', 'Yahoo finance', 'Competitors'];
  stockChartsUrl = constatnts.STOCK_CHARTS_URL;
  sectorStageAnalysisUrl = constatnts.SECTOR_STAGE_ANALYSIS_URL;
  shortAndVolumeUrl = constatnts.SHORT_AND_VOLUME_URL;
  institutionalOwnershipUrl = constatnts.INSTITUTIONAL_OWNERSHIP_URL;
  mansfieldsRsUrl = constatnts.MANSFIELDS_RS_URL;
  yahooFinanceUrl = constatnts.YAHOO_FINANCE_URL;
  stockCompetitorsUrl = constatnts.STOCK_COMPETITORS_URL;
  filteredStocks: FilteredStock[];
  serverError: boolean;
  spinnerText: string;
  invalidParamsMessage: string;

  @ViewChild('epsGrowthQuarters') epsGrowthQuarters: ElementRef;
  @ViewChild('accelerationQuarters') accelerationQuarters: ElementRef;
  @ViewChild('epsGrowthYears') epsGrowthYears: ElementRef;
  @ViewChild('accelerationYears') accelerationYears: ElementRef;
  @ViewChild('stockSymbol') stockSymbol: ElementRef;
  @ViewChild('modal') modal: ElementRef;

  constructor(private spinner: NgxSpinnerService,
              private stocksFilterService: StocksFilterService) { }

  ngAfterViewInit(): void {
    document.getElementById("epsThresholdQ").focus();
  }

  filterStocks(): void {
    const filters = this.setFiltersToMap();
    if (this.isParamsValid(filters)) {
      this.fetchStocksByFilters(filters);
    }
  }

  setFiltersToMap(): Map<String, String> {
    const filters = new Map<String, String>();
    if (this.stockSymbol) {
      filters[constatnts.STOCK_SYMBOL] = this.stockSymbol;
    }
    if (this.epsGrowthThresholdQ) {
      filters[constatnts.EPS_GROWTH_THRESHOLD_Q] = this.epsGrowthThresholdQ;
    }
    if (this.epsGrowthThresholdY) {
      filters[constatnts.EPS_GROWTH_THRESHOLD_Y] = this.epsGrowthThresholdY;
    }
    if (this.epsGrowthQuarters.nativeElement.value) {
      filters[constatnts.EPS_GROWTH_QUARTERS] = this.epsGrowthQuarters.nativeElement.value;
    }
    if (this.epsGrowthYears.nativeElement.value) {
      filters[constatnts.EPS_GROWTH_YEARS] = this.epsGrowthYears.nativeElement.value;
    }
    if (this.accelerationQuarters.nativeElement.value) {
      filters[constatnts.ACCELERATION_QUARTERS] = this.accelerationQuarters.nativeElement.value;
    }
    if (this.accelerationYears.nativeElement.value) {
      filters[constatnts.ACCELERATION_YEARS] = this.accelerationYears.nativeElement.value;
    }
    if (this.salesGrowthThreshold) {
      filters[constatnts.SALES_GROWTH_THRESHOLD] = this.salesGrowthThreshold;
    }
    return filters;
  }

  isParamsValid(filters: Map<String, String>): boolean {
    if (!this.allParamsAreNumbers(filters)) {
      return false;
    }
    if (Object.keys(filters).length === 0) {
      this.openModal('At least 1 filter must be given');
      return false;
    }
    if ((constatnts.EPS_GROWTH_THRESHOLD_Q in filters && !(constatnts.EPS_GROWTH_QUARTERS in filters)) ||
        (constatnts.EPS_GROWTH_QUARTERS in filters && !(constatnts.EPS_GROWTH_THRESHOLD_Q in filters))) {
          this.openModal('Filtering quarterly EPS growth must have both threshold and quarters');
          return false;
    }
    if ((constatnts.EPS_GROWTH_THRESHOLD_Y in filters && !(constatnts.EPS_GROWTH_YEARS in filters)) ||
        (constatnts.EPS_GROWTH_YEARS in filters && !(constatnts.EPS_GROWTH_THRESHOLD_Y in filters))) {
          this.openModal('Filtering yearly EPS growth must have both threshold and quarters');
          return false;
    }
    return true;
  }

  allParamsAreNumbers(filters: Map<String, String>): boolean {
    if (constatnts.EPS_GROWTH_THRESHOLD_Q in filters && isNaN(filters[constatnts.EPS_GROWTH_THRESHOLD_Q])) {
      this.openModal('Quarterly EPS growth must be a valid number');
      return false;
    }
    if (constatnts.EPS_GROWTH_THRESHOLD_Y in filters && isNaN(filters[constatnts.EPS_GROWTH_THRESHOLD_Y])) {
      this.openModal('Yearly EPS growth must be a valid number');
      return false;
    }
    if (constatnts.SALES_GROWTH_THRESHOLD in filters && isNaN(filters[constatnts.SALES_GROWTH_THRESHOLD])) {
      this.openModal('Sales growth threshold must be a valid number');
      return false;
    }
    return true;
  }

  openModal(bodyMessage: string): void {
    this.modalBody = bodyMessage;
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }

  fetchStocksByFilters(filters: Map<String, String>): void {
    this.beforeFetchingStocks();
    this.stocksFilterService.getFilteredStocks(filters)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (data: FilteredStock[]) => {
          if (data.length == 0 && this.stockSymbol) {
            this.openModal('The given stock symbol does not exist');
          } else {
            this.filteredStocks = data
          }
        },
        () => this.serverError = true
      );
  }

  beforeFetchingStocks(): void {
    this.serverError = false;
    this.spinnerText = 'Loading...';
    this.showSpinner();
  }

  showSpinner(): void {
    this.spinner.show();
  }

  hideSpinner(): void {
    this.spinner.hide();
  }
}
