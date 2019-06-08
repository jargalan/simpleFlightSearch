import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights = undefined;

  constructor() {}

  ngOnInit() {
  }
  
  updateFlights(data) {
    this.flights = data;
  }

}