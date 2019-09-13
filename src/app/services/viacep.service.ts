import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  constructor(private httpClient: HttpClient) { }

  get(zipcode: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.viacep}/${zipcode}/json/`).pipe(map(x => {
      return new Address(x.cep, x.logradouro, x.bairro, x.localidade);
    }));
  }

}
