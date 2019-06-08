import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  private formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  getFlights(flightNumber: String, date: Date) {
    return this.http.get(API_URL + '/flights/' + flightNumber + '/' + this.formatDate(date));
  }

  getFlightsByDirect(date: Date, origin: String, destination: String) {
    return this.http.get(API_URL + '/flights/' + origin + '/' + destination + '/' + this.formatDate(date));
  }
}