import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { authInterface } from './interface/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  public url = environment.URL_API;

  constructor(
  private httpclient: HttpClient)
   {}
  headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  logIn(credentials : authInterface): Observable<any> {
    const myObjCredentials  = {
      authUser: credentials.authUser,
      authPassword: credentials.authPassword,
      
    };
    console.log(myObjCredentials);
    
    return this.httpclient.put<any>(this.url +'auth/login',myObjCredentials,{headers:this.headers});
  }
  logOut(): Observable<any> {
    return this.httpclient.delete<any>(this.url +'auth/logout',{ headers:this.headers});
  }


  tokenRefresh():Observable<any>{
    return this.httpclient.post<any>(this.url +'auth/refresh',{headers:this.headers})
  }


  getUserLogeado():Observable<any>{
    return this.httpclient.get<any>(this.url +'users/profile',{headers:this.headers})
  }


  

}


