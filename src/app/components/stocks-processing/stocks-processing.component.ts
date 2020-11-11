import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StocksProcessingService } from '../../services/stocks-processing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stocks-processing',
  templateUrl: './stocks-processing.component.html',
  styleUrls: ['./stocks-processing.component.css']
})
export class StocksProcessingComponent implements OnInit {

  breakoutModalForm: FormGroup;
  alertMessage: string;
  operationLaunchedSuccessfully: boolean;
  eyeImageUrl = 'http://www.w3.org/2000/svg';

  @ViewChild('alert') alertDiv: ElementRef;
  @ViewChild('backgroundManager') backgroundManagerButton: ElementRef;
  @ViewChild('breakout') breakoutModal: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;

  constructor(private stocksProcessingService: StocksProcessingService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.breakoutModalForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  runBackgroundManager(): void {
    this.beforeRunningCommand();
    this.stocksProcessingService.runBackgroundManager()
      .pipe(finalize(() => this.afterRunningCommand()))
      .subscribe(
        () => {
          this.afterSuccessfullLaunch('Background manager is launched successfully');
          this.backgroundManagerButton.nativeElement.disabled = true;
        },
        () => this.afterFailedLaunch('Failed to launch the Background manager')
      );
  }

  runScrapper(): void {
    this.beforeRunningCommand();
    this.stocksProcessingService.runScrapper()
      .pipe(finalize(() => this.afterRunningCommand()))
      .subscribe(
        () => this.afterSuccessfullLaunch('Scrapper is launched successfully'),
        () => this.afterFailedLaunch('Failed to launch the stocks Scrapper')
      );
  }

  runStockRater(): void {
    this.beforeRunningCommand();
    this.stocksProcessingService.runRater()
      .pipe(finalize(() => this.afterRunningCommand()))
      .subscribe(
        () => this.afterSuccessfullLaunch('Stock rater is launched successfully'),
        () => this.afterFailedLaunch('Failed to launch the tocks Rater')
      );
  }

  runTechnicalAnalysis(): void {
    this.beforeRunningCommand();
    this.stocksProcessingService.runTechnicalAnalysis()
      .pipe(finalize(() => this.afterRunningCommand()))
      .subscribe(
        () => this.afterSuccessfullLaunch('Techincal analysis is launched successfully'),
        () => this.afterFailedLaunch('Failed to launch the Techincal analysis')
      );
  }

  runBreakoutDetection(): void {
    const password = this.passwordInput.nativeElement.value;
    this.hidePasswordModal();
    this.beforeRunningCommand();
    this.stocksProcessingService.runBreakoutDetection(password)
      .pipe(finalize(() => this.afterRunningCommand()))
      .subscribe(
        () => this.afterSuccessfullLaunch('Breakout detection is launched successfully'),
        () => this.afterFailedLaunch('Failed to launch the Breakout detection')
      );
  }

  beforeRunningCommand(): void {
    this.spinner.show();
  }

  afterRunningCommand(): void {
    this.spinner.hide();
  }

  afterSuccessfullLaunch(bodyMessage: string): void {
    this.operationLaunchedSuccessfully = true;
    this.openAlert(bodyMessage);
  }

  afterFailedLaunch(bodyMessage: string): void {
    this.operationLaunchedSuccessfully = false;
    this.openAlert(bodyMessage);
  }

  openAlert(bodyMessage: string): void {
    this.alertMessage = bodyMessage;
    this.alertDiv.nativeElement.style.visibility = 'visible';
  }

  closeAlert(): void {
    this.alertDiv.nativeElement.style.visibility = 'hidden';
  }

  showBreakoutModal(): void {
    console.log(this.passwordInput);
    this.breakoutModal.nativeElement.style.display = 'block';
    this.passwordInput.nativeElement.focus();
  }

  hidePasswordModal(): void {
    this.breakoutModal.nativeElement.style.display = 'none';
    this.passwordInput.nativeElement.value = '';
  }

  showPassword(): void {
    this.passwordInput.nativeElement.type = 'text';
  }

  hidePassword(): void {
    this.passwordInput.nativeElement.type = 'password';
    this.passwordInput.nativeElement.focus();
  }

  alertType(): object {
    if (this.operationLaunchedSuccessfully) {
      return {'alert-success': true};
    } else {
      return {'alert-danger': true};
    }
  }
}
