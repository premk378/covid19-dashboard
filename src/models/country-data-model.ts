export class CountryInfo {
  iso2: string;
  iso3: string;
  _id: number;
  lat: number;
  long: number;
  flag: string;
}

export class CountryData {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  continent: number;

}
