/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileResolverService } from './profile-resolver.service';

describe('Service: ProfileResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileResolverService]
    });
  });

  it('should ...', inject([ProfileResolverService], (service: ProfileResolverService) => {
    expect(service).toBeTruthy();
  }));
});
