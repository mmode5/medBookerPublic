import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/envirements/envirement';
import { API_BASE } from '../models/tokens';

import { PractitionerService } from './practitioner.service';

describe('PractitionerService', () => {
  let service: PractitionerService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: API_BASE, useValue: environment.apiBase }],
    });
    service = TestBed.inject(PractitionerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
