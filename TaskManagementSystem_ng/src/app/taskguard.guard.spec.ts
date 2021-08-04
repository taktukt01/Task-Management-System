import { TestBed } from '@angular/core/testing';

import { TaskguardGuard } from './taskguard.guard';

describe('TaskguardGuard', () => {
  let guard: TaskguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TaskguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
