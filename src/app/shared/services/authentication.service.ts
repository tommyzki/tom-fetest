import { Injectable } from '@angular/core';
import { ApiService } from './core/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user
  allowed = false;

  constructor(
    private api: ApiService
  ) {}
}
