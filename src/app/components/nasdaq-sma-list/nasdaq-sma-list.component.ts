import { Component, Input, HostListener } from '@angular/core';
import { NasdaqComposite } from '../../models/NasdaqComposite';

@Component({
  selector: 'app-nasdaq-sma-list',
  templateUrl: './nasdaq-sma-list.component.html',
  styleUrls: ['./nasdaq-sma-list.component.css']
})
export class NasdaqSmaListComponent {

  gridApi: any;
  @Input() nasdaqEntries: NasdaqComposite[];
  columnsDef = [
    { headerName: 'Date', field: 'date' },
    { headerName: 'MA(3)', field: 'ma3' },
    { headerName: 'MA(3) Change', field: 'ma3Change', cellStyle: this.getMovingAvgChangeCellStyle },
    { headerName: 'MA(7)', field: 'ma7' },
    { headerName: 'MA(7) Change', field: 'ma7Change', cellStyle: this.getMovingAvgChangeCellStyle },
    { headerName: 'Action', field: 'action', cellStyle: this.getActionCellStyle }
  ];
  defaultColDef = {
    sortable: true,
    lockPosition: true,
    wrapText: true
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.reorganizeColumns();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.reorganizeColumns();
  }

  onContentChanges(): void {
    this.reorganizeColumns();
  }

  reorganizeColumns(): void {
    if (this.gridApi !== undefined) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  getMovingAvgChangeCellStyle(params: any): object {
    return Number(params.value.slice(0, -1)) > 0 ? {color: 'green'} : {color: 'red'};
  }

  getActionCellStyle(params: any): object {
    if (params.value === 'BUY') {
      return {color: 'white', background: 'green', opacity: 0.7};
    } else {
      return {color: 'white', background: 'red', opacity: 0.755};
    }
  }
}
