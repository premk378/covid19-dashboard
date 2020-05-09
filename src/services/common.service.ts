import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryData} from '../models/country-data-model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public getAllCountriesData(): Observable<CountryData[]>
  {
    return this.http.get<CountryData[]>('https://corona.lmao.ninja/v2/countries?sort=cases');
  }

  getSortedData(sortParameter): Observable<CountryData[]> {
    const url = 'https://corona.lmao.ninja/v2/countries?sort='+sortParameter;
    console.log(url);
    return this.http.get<CountryData[]>(url);
  }

  getHistoricalData(countryName: string) {
    return this.http.get('https://corona.lmao.ninja/v2/historical/'+countryName);
  }

  getNewsFeeds(searchTerm?,sortParam?):Observable<any>
  {
    let apiKey = environment.apiKey;
    let date : Date = new Date();
    let formattedDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
    let url = 'https://newsapi.org/v2/everything?q='+searchTerm+'&sortBy='+sortParam+'&from='+formattedDate+'&apiKey='+apiKey;
    return this.http.get(url);
  }
}
