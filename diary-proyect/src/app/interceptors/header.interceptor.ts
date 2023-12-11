import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}
   headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// const headers = new HttpHeaders({'x-api-key':'7802c4c0'});

    const reqClone = request.clone({
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at') 
      
    });


    return next.handle(reqClone);
  }
}
