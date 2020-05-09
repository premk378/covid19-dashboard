import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CountryData} from '../../models/country-data-model';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
export class TabularComponent {

  @Input() countryData: CountryData[];
  sortType: string = 'Cases';
  constructor(private commonService: CommonService) { }

  sortData(type: string) {
    this.sortType = type;
    this.commonService.getSortedData(type.toLowerCase()).subscribe(data => {
      this.countryData = data;
    })
  }
}
