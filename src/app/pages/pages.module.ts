import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'user-detail',
        loadChildren: () => import('./user-detail/user-detail.module').then((m) => m.UserDetailModule),
      },
    ],
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
