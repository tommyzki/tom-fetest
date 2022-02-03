import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  postId: any = null;
  employeeData

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.postId = params.id;
    });

    this.fetch(data => {
      this.employeeData = data.find(opt => opt.username == this.postId);
    });
  }

  ngOnInit(): void {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100Records.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  back(): void {
    this.location.back()
  }

}
