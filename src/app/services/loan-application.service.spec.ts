/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoanApplicationService } from './loan-application.service';

describe('Service: LoanApplication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanApplicationService]
    });
  });

  it('should ...', inject([LoanApplicationService], (service: LoanApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
