import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CountryData} from '../../models/country-data-model';
import {CommonService} from '../../services/common.service';
import * as ApexCharts from '../../third-party/apexcharts.js';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit,OnChanges {

  countryData: CountryData[] = [];
  @Input() start: number = 0;
  chart: any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllCountriesData();
  }

  getAllCountriesData()
  {
    this.commonService.getAllCountriesData().subscribe(data => {
      this.countryData = data;
      this.renderApexChart();
    })
  }

  /*private prepareDataForChart(type:string) {
    let barGraphData: GraphData[] = [];
    let casePoints: Point[] = [];
    for(let i=0;i<20;i++)
    {
      let cnt: CountryData = this.countryData[i];
      let casePoint: Point;
      if(type == 'Cases')
        casePoint = new Point(cnt.cases,cnt.country);
      else if (type == 'Deaths')
        casePoint = new Point(cnt.deaths,cnt.country);
      casePoints.push(casePoint);
    }

    let casesDataSet = new GraphData('column',false,'grey',type,casePoints,null,'12',null,'{label}-{y}',null,null,null,'primary');
    barGraphData.push(casesDataSet);
    let chart = new CanvasJS.Chart("barContainer", {
      animationEnabled: true,
      theme: "light1",
      data: barGraphData
    });
    chart.render();
  }*/

  ngOnChanges(changes: SimpleChanges): void {
    if(this.start != null && this.start != undefined)
    {
      this.chart.destroy();
      this.renderApexChart();
    }
  }

  private renderApexChart() {
    let casesArray: number[] = [];
    let deathArray: number[] = [];
    let countryNames: string[] = [];
    for(let i=0;i<10;i++)
    {
      let country = this.countryData[i+this.start];
        casesArray.push(country.cases);
        deathArray.push(country.deaths);
        countryNames.push(country.country.substr(0,13));
    }

    let options = {
      series: [{
        name: 'CASES',
        data: casesArray
      }, {
        name: 'DEATHS',
        data: deathArray
      }],
      colors: ['#1AA7D0','#F80F0F'],
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 900,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        type: 'string',
        categories: countryNames,
      },
      legend: {
        position: 'bottom',
        offsetX: 70,
        fontSize: '14px',
        fontWeight: 'bold'
      },
      fill: {
        opacity: 1,
      }
    };

    this.chart = new ApexCharts(document.querySelector("#barContainer"), options);
    this.chart.render();
  }
}
