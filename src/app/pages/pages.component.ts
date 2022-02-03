import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  userData

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    let userId = localStorage.getItem('SESS_TOKEN') ? localStorage.getItem('SESS_TOKEN') : '';
    if (userId) {
    } else {
      this.router.navigate(['/login']);
    }
  }

  gotoUser(){
    this.router.navigate(['/user-detail']);
  }

}
