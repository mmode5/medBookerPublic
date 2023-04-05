import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/envirements/envirement';
import { API_BASE } from '../models/tokens';

import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE, useValue: environment.apiBase }],
    });
    service = TestBed.inject(MemberService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
