import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {
  @Output() notify = new EventEmitter<any>();
  searchByFlightForm: FormGroup;
  searchByDirectForm: FormGroup;

  options: string[] = ['ATL', 'BOS', 'BWI', 'CLT', 'DCA', 'DEN', 'DFW', 'DTW', 'EWR', 'FLL', 'IAD', 'IAH','JFK',
  'LAS', 'LAX', 'LGA', 'MDW', 'MCO', 'MIA', 'MSP', 'ORD', 'PDX', 'PHL', 'PHX', 'RDU', 'SAN', 'SEA', 'SLC'];
  filteredOptions: Observable<string[]>;
  filteredDestOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService) {

    this.searchByFlightForm = this.formBuilder.group({
      date: ['', Validators.required],
      flightNumber: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.searchByDirectForm = this.formBuilder.group({
      date: ['', Validators.required],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.filteredOptions = this.searchByDirectForm.controls.origin.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
    
    this.filteredDestOptions = this.searchByDirectForm.controls.destination.valueChanges
      .pipe(startWith(''), map(value => this._filter(value)));
  }

  get sf() { return this.searchByFlightForm.controls; }

  get sd() { return this.searchByDirectForm.controls; }

  onSearchByFlight() {
    const controls = this.searchByFlightForm.controls;

    if (this.searchByFlightForm.valid) {
      this.flightService.getFlights(
        controls.flightNumber.value,
        controls.date.value).subscribe(data => {
          this.notify.emit(data);
      });
    }
  }

  onSearchByDirect() {
    const controls = this.searchByDirectForm.controls;

    if (this.searchByDirectForm.valid) {
      this.flightService.getFlightsByDirect(
        controls.date.value,
        controls.origin.value.toUpperCase(),
        controls.destination.value.toUpperCase()).subscribe(data => {
          this.notify.emit(data);
      });
    }
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.options.filter(option => option.toUpperCase().includes(filterValue));
  }

}