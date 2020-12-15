import { Component, OnInit,AfterContentInit, AfterViewInit ,ViewEncapsulation } from '@angular/core';

declare var watchlist: any;

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class WatchlistComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
    watchlist = new watchlist();

  }
}