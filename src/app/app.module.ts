import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NasdaqComponent } from './components/nasdaq-composite/nasdaq/nasdaq.component';
import { NasdaqSmaListComponent } from './components/nasdaq-composite/nasdaq-sma-list/nasdaq-sma-list.component';
import { NasdaqDatesBarComponent } from './components/nasdaq-composite/nasdaq-dates-bar/nasdaq-dates-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TechnicallyValidComponent } from './components/technically-valid/technically-valid.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'nasdaq', component: NasdaqComponent },
  { path: 'technically-valid', component: TechnicallyValidComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    NasdaqComponent,
    NasdaqSmaListComponent,
    NasdaqDatesBarComponent,
    HomeComponent,
    NavBarComponent,
    TechnicallyValidComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
