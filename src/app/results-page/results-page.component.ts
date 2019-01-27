import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';

import {Trash, data} from '../search-bar/trash';
import * as extractor from 'striptags';
import * as cleaner from 'html-cleaner';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  search_term = '';
  stateCtrl = new FormControl();
  filteredTrash:Trash[];
  trash = data;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    this.search_term = this.route.snapshot.params['search'];

    console.log(this.search_term);
    this.filteredTrash = this._filterTrash();
    this.filteredTrash[0].body = cleaner.unescape(cleaner.escape(this.filteredTrash[0].body));
    this.filteredTrash[0].body = extractor(this.filteredTrash[0].body);
  }

  private _filterTrash(): Trash[] {
    const filterValue = this.search_term.toLowerCase();
    var holder = [];
    let status:boolean = false;

    for(let entry=0; entry < data.length; entry++){
      var check_keywords = data[entry].keywords.split(',');
      check_keywords.forEach(function (value) {
          if (status == false && value.trim().startsWith(filterValue)) {
              data[entry].actual = value;
              holder.push(data[entry]);
              status = true;
          }
      });
    }
    console.log(holder);
    return holder;
  }

}
