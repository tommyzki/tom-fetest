import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  show = false;
  userData
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initLoginForm();
  }

  ngOnInit(): void {
    let userId = localStorage.getItem('SESS_TOKEN') ? localStorage.getItem('SESS_TOKEN') : '';
    if (userId) {
      this.router.navigate(['/home']);
    }
  }

  initLoginForm() {
    this.fg = this.fb.group({
      username: [
        '',
      ],
      password: [
        '',
      ],
    });
  }

  showLogin() {
    this.show = !this.show;
  }
  
  submitLogin() {
    if (this.fg.value.username == 'admin' && this.fg.value.password == 'admin') {
      localStorage.setItem('SESS_TOKEN', 'admin');
      this.toastr.success('goTo Home', 'Login Success');
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('Username/Password not Found', 'Login Failed', {
        timeOut: 3000,
      });
    }
  }
}
