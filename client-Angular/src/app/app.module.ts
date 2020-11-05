import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { InteresCompuestoComponent } from './interes-compuesto/interes-compuesto.component';
import { ChartFormComponent } from './chart-form/chart-form.component';
import { ChartComponent } from './components/chart/chart.component';
import { InteresCompuestoPropioComponent } from './containers/interes-compuesto-propio/interes-compuesto-propio.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    InteresCompuestoComponent,
    ChartFormComponent,
    ChartComponent,
    InteresCompuestoPropioComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
