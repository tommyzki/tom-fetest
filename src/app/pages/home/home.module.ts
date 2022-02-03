import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },{
    path: 'add',
    component: AddComponent,
  },{
    path: ':id',
    component: DetailComponent,
  }
];

@NgModule({
  declarations: [HomeComponent, DetailComponent, AddComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CurrencyPipe,BsDatepickerConfig]
})
export class HomeModule {}
