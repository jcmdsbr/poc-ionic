import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${environment.baseUrl}/contacts`);
  }

  getById(id: string): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${environment.baseUrl}/contacts/${id}`);
  }

  create(Contact: Contact): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/contacts/`, Contact);
  }

  update(contact: Contact): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/contacts/${contact.id}`, Contact);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/contacts/${id}`);
  }


}
