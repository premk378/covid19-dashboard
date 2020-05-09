import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {CountryData} from '../../models/country-data-model';
declare var $: any;

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit,OnChanges {

  @Input() selectedCountry: CountryData = new CountryData();
  newsFeeds: any[] = [];
  numbers: number[] = [1,2,3,4,5,6,7,8,9,10];
  sortIndex:number = 0;
  sortArray: any[] = [{name:'popularity', desc: 'Popularity'},{name:'relevance', desc: 'Relevance'},{name:'publishedAt', desc: 'Published'}
  ];
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    $('.feed-filter').dropdown();
  }

  getFeeds(country: string)
  {
    this.commonService.getNewsFeeds('coronavirus '+country,'publishedAt').subscribe(data => {
      this.newsFeeds = data.articles;
      this.newsFeeds.splice(20);
    })
  }

  sortFeeds(sortParam: number) {
    this.sortIndex = sortParam;
    this.commonService.getNewsFeeds('coronavirus '+this.selectedCountry.country,this.sortArray[sortParam]['name'].toLowerCase()).subscribe(data => {
      this.newsFeeds = data.articles;
      this.newsFeeds.splice(20);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selectedCountry.country!=null && this.selectedCountry.country!=undefined)
      this.getFeeds(this.selectedCountry.country);
  }
}
