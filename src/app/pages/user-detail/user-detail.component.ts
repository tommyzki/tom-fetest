import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userData

  constructor(
    private router: Router,
    private location: Location
  ) {
    let userId = localStorage.getItem('SESS_TOKEN') ? localStorage.getItem('SESS_TOKEN') : '';
    if (userId) {
      this.getuserData(userId)
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

  }

  getuserData(id) {
    this.userData = {
      username: id,
      email: id,
    }
  }

  back(): void {
    this.location.back()
  }

  submitLogout(){
    localStorage.removeItem('SESS_TOKEN');
    this.router.navigate(['/login']);
  }

}
