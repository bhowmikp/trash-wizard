import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SpeechRecognitionService } from './speech-recognition.service';
import {Trash, data} from './trash';

import {BarcodeComponent} from "./barcode/barcode.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [ SpeechRecognitionService ]
})
export class SearchBarComponent implements OnInit, OnDestroy {

  stateCtrl = new FormControl();
  filteredTrash: Observable<Trash[]>;
  trash = data;
  numSearchResultsDisplay = 3;
  search_box_empty = true;

  @ViewChild(BarcodeComponent) child: BarcodeComponent;

  ngOnInit() {}

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  constructor(private speechRecognitionService: SpeechRecognitionService,
    private router: Router) {
    this.filteredTrash = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(trash => trash ? this._filterTrash(trash) : this.trash.slice())
      );
  }

  private _filterTrash(value: string): Trash[] {
    const filterValue = value.toLowerCase();

    var holder = [];
    let status:boolean = false;

    for(let entry=0; entry < data.length; entry++){
      status = false;
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
    return holder.slice(0,this.numSearchResultsDisplay);
  }

  activateSpeechSearch(form: NgForm): void {
    this.speechRecognitionService.record()
      .subscribe(
        // listener
        (value) => {
          form.setValue({search_term: value});
          this.speechRecognitionService.DestroySpeechObject();
          this.searchRequest(form);
        },
        // error
        (err) => {
          if (err.error === 'no-speech') {
            this.activateSpeechSearch(form);
          }
        },
        // completion
        () => {
        }
    );
  }

  searchRequest(event:any): void {
    const term = event.target["0"].value.trim();
    this.router.navigateByUrl('/')
    .then(() => this.router.navigate(['/' + term]));
  }

  setSearchBoxEmptyEvent(form: NgForm): void {
    form.setValue({search_term: ''});
    this.checkSearchBoxEmpty(form);
  }

  setSearchBoxEmpty(form: NgForm): void {
    form.setValue({search_term: ''});
    this.checkSearchBoxEmpty(form);
  }

  checkSearchBoxEmpty(form: NgForm): void {
    if (form.value.search_term === '') {
      this.search_box_empty = true;
    } else {
      this.search_box_empty = false;
    }
  }

  triggerWebCam() {
    this.child.startScanner();
  }
}