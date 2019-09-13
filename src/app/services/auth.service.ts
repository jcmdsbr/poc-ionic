import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/`, user);
  }

  reset(user: User) {
    return this.httpClient.put(`${environment.baseUrl}/users/${user.id}`, user)

  }

  getFirstByEmail(email: string) {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users?email=${email}`);
  }

  login(user: User): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users?email=${user.email}&password=${user.password}`);
  }
}
