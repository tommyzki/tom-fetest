import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(DatatableComponent) public table: DatatableComponent;

  @ViewChild('search', { static: false }) search: any;

  searchKey;
  rows = [];
  temp = [];
  pageSize = 10;
  limitOptions = [
    {
      key: '5 Rows per page',
      value: 5
    },
    {
      key: '10 Rows per page',
      value: 10
    },
    {
      key: '20 Rows per page',
      value: 20
    }
  ];

  constructor(
    public router: Router,
    private toastr: ToastrService,
  ) {
    this.searchKey = localStorage.getItem('search_history') ? localStorage.getItem('search_history') : '';
    this.fetch(data => {
      this.rows = this.temp = data;
      if(this.searchKey){
        this.updateFilter(this.searchKey);
      }
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  detailPage(id) {
    this.router.navigate([`/home/${id}`]);
  }

  addEmployee(){
    this.router.navigate([`/home/add`]);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100Records.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  updateFilter(val: any) {
    localStorage.setItem('search_history', val);
    const value = val.toString().toLowerCase().trim();
    const keys = Object.keys(this.temp[0]);

    this.rows = this.temp.filter(item => {
      for (let i = 0; i < 9; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
  }

  onPageSizeChanged(event) {
    this.pageSize = event
  }


  deleteData(){
    this.toastr.error('Deleted', 'Deleted', {
      timeOut: 3000,
    });
  }

  edit(){
    this.toastr.warning('Edited', 'Edited', {
      timeOut: 3000,
    });
  }

}
