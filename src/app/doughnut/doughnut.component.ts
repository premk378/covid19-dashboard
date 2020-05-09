import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {CountryData} from '../../models/country-data-model';
import * as ApexCharts from '../../third-party/apexcharts.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit,OnChanges {

  @Input() selectedCountry: CountryData;
  chart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedCountry != null && this.selectedCountry != undefined) {
      if (this.chart != undefined && this.chart != null)
        this.chart.destroy();
      this.renderApexDoughnut();
    }
  }

  /*private renderDoughnut() {
    let doughnutData: GraphData[] = [];
    let points: Point[] = [];
    //points.push(new Point(this.selectedCountry.cases,'Total Cases'));
    points.push(new Point(this.selectedCountry.deaths,'Total Deaths','#FA1304'));
    points.push(new Point(this.selectedCountry.critical,'Critical Cases','#F07630'));
    points.push(new Point(this.selectedCountry.active,'Active Cases','#0E91DC'));
    points.push(new Point(this.selectedCountry.recovered,'Recovered','#60BF1A'));
    let countryDataSet = new GraphData('doughnut',false,null,null,points,60,12,'{label} - #percent%','<b>{label}:</b> {y} (#percent%)');
    doughnutData.push(countryDataSet);
    let chart = new CanvasJS.Chart("doughnutContainer", {
      animationEnabled: true,
      data: doughnutData
    });
    chart.render();

  }*/

  private renderApexDoughnut() {
    let options = {
      series: [this.selectedCountry.active,this.selectedCountry.deaths,this.selectedCountry.critical,this.selectedCountry.recovered],
      labels: ['Active','Deaths','Critical','Recovered'],
      colors: ['#2CB8E8','#F82B0F','#F9D074','#6EF80F'],
      chart: {
        width: 350,
        height: 330,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontWeight: 'bold',
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
      },
      responsive: [{
        breakpoint: 1000,
        options: {
          chart: {
            width: 320,
            height: 270
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    this.chart = new ApexCharts(document.querySelector("#doughnutContainer"), options);
    this.chart.render();
  }
}
