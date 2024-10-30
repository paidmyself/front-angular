import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const utilisateurConnecteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('jwt') == null) {
    return router.parseUrl('/connexion');
  }

  return true;
};
