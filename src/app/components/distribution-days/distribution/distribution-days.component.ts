import { Component,OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './canvasjs.stock.min';
import { DistributionService } from '../../../services/distribution.service';
import { IndexData } from '../../../Models/IndexData';

@Component({
    selector: 'app-distribution-days',
    templateUrl: './distribution-days.component.html'
})



export class DistributionComponent implements OnInit {
   
  constructor(private DistributionService: DistributionService) {} ; 
   
   
    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
          order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
      }
      ngOnInit() {
        let dataPoints1 = [], dataPoints2 = [], dataPoints3 = [], dataPoints4 = [];
        let dpsLength = 0;
        let data ;
        let chart = new CanvasJS.StockChart("chartContainer",{
          theme: "light2",
          exportEnabled: true,
          title:{
            text:"Nasdaq composite with distribution days"
          },
          subtitles: [{
            text: ""
          }],
          charts: [{
            toolTip: {
              shared: true
            },
            axisX: {
              lineThickness: 5,
              tickLength: 0,
              labelFormatter: function(e) {
                return "";
              },
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                  return "";
                }
              }
            },
            axisY: {
              prefix: "$",
              tickLength: 0,
              title: "",
            },
            legend: {
              verticalAlign: "top"
            },
            data: [{
              name: "Price",
              color:"black",
              yValueFormatString: "$#,###.##",
              xValueFormatString: "MMM DD YYYY",
              type: "candlestick",
              dataPoints :dataPoints1 
              //label: dataPoints1
              //{ y: 71, label: "cat 1"}
            }
            ,
            {
                name: "Price",
                color:"yellow",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                type: "candlestick",
                dataPoints : dataPoints4
            }
        ],  rangeSelector: {
            enabled: false
        }
        
          },{
            height: 100,
            toolTip: {
              shared: true
            },
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "MMM DD YYYY"
              }
            },
            axisY: {
              prefix: "$",
              tickLength: 0,
              title: "Volume",
              labelFormatter: this.addSymbols
            },
            legend: {
              verticalAlign: "top"
            },
            data: [{
              name: "Volume",
              yValueFormatString: "$#,###.##",
              xValueFormatString: "MMM DD YYYY",
              dataPoints : dataPoints2
            }]
          }],
          navigator: {
            data: [{
              dataPoints: dataPoints3
            }],
            slider: {
              minimum: new Date("2019-01-01"),

              maximum: new Date("2020-11-10")
            }
          }
        });
        data = this.DistributionService.getPlainIndex().subscribe( data => {
            for(var i = 0; i < data.length; i++){
            dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;
            dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume)});
            dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
            if (data[i].is_distribution == 1){
                dataPoints4.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;
            };
          }
          chart.render();
        }
        )

        
          /*$.getJSON("https://canvasjs.com/data/docs/ethusd2018.json", function(data) {
          for(var i = 0; i < data.length; i++){
            dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;
            dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
            dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
            if (i % 20 == 0){
                dataPoints4.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;

            }
          }
          chart.render();
        }); */
      }
    }