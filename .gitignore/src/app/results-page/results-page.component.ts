import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {
  search_term = '';

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.search_term = this.route.snapshot.params['search'];
    console.log(this.search_term);
    console.log("HI");
  }

}
