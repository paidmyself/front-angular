import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { utilisateurConnecteGuard } from './utilisateur-connecte.guard';

describe('utilisateurConnecteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => utilisateurConnecteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
