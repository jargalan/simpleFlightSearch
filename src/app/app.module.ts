import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,
  MatExpansionModule, MatAutocompleteModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
];
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    modules,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: FlightListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchFlightComponent,
    FlightListComponent
  ],
  exports: [ modules ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
