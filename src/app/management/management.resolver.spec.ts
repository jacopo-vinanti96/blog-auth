import { TestBed } from '@angular/core/testing';

import { ManagementResolver } from './management.resolver';

describe('ManagementResolver', () => {
  let resolver: ManagementResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ManagementResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
