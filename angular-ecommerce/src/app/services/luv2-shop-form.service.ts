import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countryURL = 'http://localhost:8080/api/countries/';
  private stateURL = 'http://localhost:8080/api/states/';

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endEyar: number = startYear + 10;
    for (let theYear = startYear; theYear <= endEyar; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countryURL).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: String): Observable<State[]>{
    const theURL = this.stateURL + `search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseStates>(theURL).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}