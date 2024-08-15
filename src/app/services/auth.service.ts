import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://127.0.0.1:8000/";
  
  constructor(private http:HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}user/register/`, user);
  }
  /*
  login(request: AuthRequest){
    return this.http.post(`${this.apiUrl}login/`, user);
  }

  logout(){
    return this.http.post(`${this.apiUrl}logout/`, user);
  }*/
}