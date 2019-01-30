import { TestBed } from '@angular/core/testing';

import { CheckListDatabaseService } from './check-list-database.service';

describe('CheckListDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckListDatabaseService = TestBed.get(CheckListDatabaseService);
    expect(service).toBeTruthy();
  });
});
