import { Component, Input } from '@angular/core';
import { NasdaqComposite } from '../../models/NasdaqComposite';

@Component({
  selector: 'app-nasdaq-sma-list',
  templateUrl: './nasdaq-sma-list.component.html',
  styleUrls: ['./nasdaq-sma-list.component.css']
})
export class NasdaqSmaListComponent {

  @Input() nasdaqEntries: NasdaqComposite[];
  tableHeaders = ['Date', 'MA(3)', 'MA(3) Change', 'MA(7)', 'MA(7) Change', 'Action'];
}
