import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CountryData} from '../../models/country-data-model';
import {CommonService} from '../../services/common.service';
import * as ApexCharts from '../../third-party/apexcharts.js';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit,OnChanges {

  @Input() selectedCountry: CountryData;
  historicalData: any;
  chart: any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedCountry != null && this.selectedCountry != undefined && this.selectedCountry.country != null && this.selectedCountry.country != undefined)
      this.getHistoricalData();
  }

  private getHistoricalData() {
    this.commonService.getHistoricalData(this.selectedCountry.country.toLowerCase()).subscribe(data=>{
      this.historicalData = data;
      //console.log(this.historicalData);
      if(this.chart!=undefined && this.chart!=null)
        this.chart.destroy();
      this.renderApexLineChart();
    })
  }
  private renderApexLineChart() {
    let dailyCasesArray: number[] = []
    let dailyDeathsArray: number[] = []
    let casesArray: number[] = [];
    let deathsArray: number[] = [];
    let dates: string[] = [];
    let i = 0;
    for (let key in this.historicalData.timeline.cases) {
      dates.push(key);
      casesArray.push(this.historicalData.timeline.cases[key]);
    }
    for (let key in this.historicalData.timeline.deaths) {
      deathsArray.push(this.historicalData.timeline.deaths[key]);
    }
    //casesArray.splice(0,30);
    //deathsArray.splice(0,30);
    //dates.splice(0,30);
    for(let i=1;i<casesArray.length;i++)
    {
      dailyCasesArray.push(casesArray[i]-casesArray[i-1]);
      dailyDeathsArray.push(deathsArray[i]-deathsArray[i-1]);
    }
    //this.drawChart(this.casesArray,this.deathsArray,this.dates);
    let options = this.getOptionObject(casesArray,deathsArray,dates);
    this.chart = new ApexCharts(document.querySelector("#lineContainer"), options);
    this.chart.render();
  }

  private getOptionObject(casesArray: number[], deathsArray: number[], dates: string[]):any {
    let options = {
      series: [
        {
          name: "Cases",
          data: casesArray
        },
        {
          name: "Deaths",
          data: deathsArray
        }
      ],
      chart: {
        height: 450,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#0F76B5', '#F81A0F'],
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        }
      },
      xaxis: {
        categories: dates
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -25,
        offsetX: -5,
      },
      fill:{
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: [ '#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
    };
    return options;
  }
}
