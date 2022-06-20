import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.full;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.initialNavigation();
  }
}
