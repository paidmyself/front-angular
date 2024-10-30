import { HttpInterceptorFn } from '@angular/common/http';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const jwt = localStorage.getItem('jwt');

  if(jwt) {

    req = req.clone({
      headers: req.headers.append('Authorization', jwt),
    });

  }

  return next(req);
};
