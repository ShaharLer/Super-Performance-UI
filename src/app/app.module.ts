import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from './components/home/home.component';
import { NasdaqMainComponent } from './components/nasdaq/nasdaq-main/nasdaq-main.component';
import { NasdaqSmaListComponent } from './components/nasdaq/nasdaq-sma-list/nasdaq-sma-list.component';
import { NasdaqDatesBarComponent } from './components/nasdaq/nasdaq-dates-bar/nasdaq-dates-bar.component';
import { NasdaqErrorComponent } from './components/nasdaq/nasdaq-error/nasdaq-error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TechnicallyValidMainComponent } from './components/technically-valid/technically-valid-main/technically-valid-main.component';
import { TechnicallyValidErrorComponent } from './components/technically-valid/technically-valid-error/technically-valid-error.component';
import { BreakoutMainComponent } from './components/breakout/breakout-main/breakout-main.component';
import { BreakoutErrorComponent } from './components/breakout/breakout-error/breakout-error.component';
import { StocksProcessingMainComponent } from './components/stocks-processing/stocks-processing-main/stocks-processing-main.component';
import { DistributionComponent } from './components/distribution-days/distribution/distribution-days.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stocks-processing', component: StocksProcessingMainComponent },
  { path: 'nasdaq', component: NasdaqMainComponent },
  { path: 'pivots', component: TechnicallyValidMainComponent },
  { path: 'breakouts', component: BreakoutMainComponent },
  { path: 'dist', component: DistributionComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavBarComponent,
    HomeComponent,
    StocksProcessingMainComponent,
    TechnicallyValidMainComponent,
    TechnicallyValidErrorComponent,
    NasdaqMainComponent,
    NasdaqSmaListComponent,
    NasdaqDatesBarComponent,
    NasdaqErrorComponent,
    BreakoutMainComponent,
    BreakoutErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
