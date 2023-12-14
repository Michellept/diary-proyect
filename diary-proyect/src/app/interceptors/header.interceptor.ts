import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private snakbar: MatSnackBar,
  ) {}
   headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// const headers = new HttpHeaders({'x-api-key':'7802c4c0'});

    const reqClone = request.clone({
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at') 
      
    });


    return next.handle(reqClone).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => {
          this.snakbar.open(error.error.message, 'Aceptar', {
            duration: 1000,
          })
        });
        
      })
    );
  }
}
