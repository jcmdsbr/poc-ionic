import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(private httpClient: HttpClient) { }

  get(zipcode: string): Observable<Address> {
    return this.httpClient.get<Address>(`viacep.com.br/ws/${zipcode}/json/`);
  }

}
