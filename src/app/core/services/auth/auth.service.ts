import { Injectable } from '@angular/core';
import { environnement } from '../../../../environnement/environnement';
import { HttpClient } from '@angular/common/http';
import { AuthLoginData, AuthLoginResponse } from '../../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environnement.apiUrl;
  constructor(private http:HttpClient){}

  login(data: AuthLoginData): Observable<AuthLoginResponse> {
    return this.http.post<AuthLoginResponse>(this.url + 'login', data);
  }
}
