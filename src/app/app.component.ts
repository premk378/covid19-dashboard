import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '../services/common.service';
import {CountryData} from '../models/country-data-model';
import {AboutComponent} from './about/about.component';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {NbDialogService} from "@nebular/theme";
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  options: string[] = [];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;
  countryData: CountryData[] = [];
  selectedCountry: CountryData = new CountryData();
  startValue: number = 0;
  countryName: any;

  constructor(private commonService: CommonService,
              private dialog: NbDialogService){}

  ngOnInit(): void {
    /*$('.country-search').dropdown();
    $('.sidemenu').dropdown();
    this.firestore.doc('analysis/').get().then
    this.firestore.collection('analysis').snapshotChanges().subscribe(data => {
      console.log(this.firestoredata);
      this.firestoredata = {
        id: data[0].payload.doc.id,
        ...(data[0].payload.doc.data() as object)
      };
      let id = this.firestoredata.id;
      this.firestoredata.visits += 1;
      delete this.firestoredata.id;
      this.firestore.doc('analysis/'+id).update(this.firestoredata);
    });*/
    this.getAllCountriesData();
  }
  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllCountriesData()
  {
    this.commonService.getAllCountriesData().subscribe(data => {
      this.countryData = data;
      this.countryData.forEach(country => {
        this.options.push(country.country);
      })
      this.selectedCountry = this.countryData.filter(c => c.country.toUpperCase() == 'INDIA')[0];
    })
  }

  onCountryChange(countryName) {

  }

  changeGraphType(type: string) {
    if(type=='Next')
      this.startValue += 10;
    else
      this.startValue -=10;
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange(event) {
    this.selectedCountry = this.countryData.filter(c => c.country.toUpperCase() == event.toUpperCase())[0];
    this.filteredOptions$ = this.getFilteredOptions(event);
  }

  showAbout() {
    this.dialog.open(AboutComponent);
  }
}
