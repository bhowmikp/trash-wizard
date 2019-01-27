import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { BarcodeComponent } from './search-bar/barcode/barcode.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {DemoMaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ResultsPageComponent,
    BarcodeComponent
  ],
  imports: [
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
