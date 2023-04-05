import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.model';
import { API_BASE } from '../models/tokens';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE) private apiBase: string
  ) {}

  retrieveAllMembers(): Observable<Entity[]> {
    return this.http.get<Entity[]>(`${this.apiBase}/member/`);
  }

  retrieveSingleMember(memberId: number): Observable<Entity> {
    return this.http.get<Entity>(`${this.apiBase}/member/${memberId}`);
  }

  searchMembers(
    firstName?: string | null,
    lastName?: string | null
  ): Observable<Entity[]> {
    let params = new HttpParams();

    firstName ? (params = params.append('firstName', firstName)) : undefined;
    lastName ? (params = params.append('lastName', lastName)) : undefined;
    return this.http.get<Entity[]>(`${this.apiBase}/member/search`, {
      params,
    });
  }
}
