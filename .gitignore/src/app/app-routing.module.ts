import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsPageComponent } from './results-page/results-page.component';

const routes: Routes = [
  { path : '', component: SearchBarComponent },
  { path : ':search', component: ResultsPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
