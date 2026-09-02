import { TestBed } from '@angular/core/testing';
import { Foodservice } from './foodservice';

describe('Foodservice', () => {
  let service: Foodservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Foodservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
