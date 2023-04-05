import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Practitioner } from '../models/entity.model';
import { API_BASE } from '../models/tokens';

@Injectable({
  providedIn: 'root',
})
export class PractitionerService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE) private apiBase: string
  ) {}

  retrieveAllPractitioners(): Observable<Practitioner[]> {
    return this.http.get<Practitioner[]>(`${this.apiBase}/practitioner/`);
  }

  retrieveSinglePractitioner(practitionerId: number): Observable<Practitioner> {
    const url = `${this.apiBase}/practitioner/${practitionerId}`;
    return this.http.get<Practitioner>(url);
  }

  searchPractitioners(
    firstName?: string | null,
    lastName?: string | null
  ): Observable<Practitioner[]> {
    let params = new HttpParams();

    firstName ? (params = params.append('firstName', firstName)) : undefined;
    lastName ? (params = params.append('lastName', lastName)) : undefined;

    return this.http.get<Practitioner[]>(
      `${this.apiBase}/practitioner/search`,
      {
        params,
      }
    );
  }
}
