import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { ApiResponse } from '../shared/models/api.model';
import { LoginCredentials } from './auth.model';
import { environment } from '../../environments/environment';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginCredentials): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${environment.baseUrl}/api/auth/login`, data)
      .pipe(delay(1000));
  }
}
