import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-technically-valid-error',
  templateUrl: './technically-valid-error.component.html',
  styleUrls: ['./technically-valid-error.component.css']
})
export class TechnicallyValidErrorComponent {

  @Output() technicallyValidStocks = new EventEmitter<void>();

  getTechnicallyValidStocks(): void {
    this.technicallyValidStocks.emit();
  }
}
