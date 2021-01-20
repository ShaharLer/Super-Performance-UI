import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breakout-error',
  templateUrl: './breakout-error.component.html',
  styleUrls: ['./breakout-error.component.css']
})
export class BreakoutErrorComponent {

  @Output() breakoutStocks = new EventEmitter<void>();

  getBreakoutStocks(): void {
    this.breakoutStocks.emit();
  }
}
