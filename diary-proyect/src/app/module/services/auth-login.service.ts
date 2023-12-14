import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { authInterface } from './interface/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  public url = environment.URL_API;
  public recurrentUser = {};

  constructor(
  private httpclient: HttpClient)
  {
  }
  // headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  logIn(credentials : authInterface): Observable<any> {
    
    // this.recurrentUser = JSON.parse(localStorage.getItem('currentUser')!)
    // console.log(this.recurrentUser);
    
    const myObjCredentials  = {
      authUser: credentials.authUser,
      authPassword: credentials.authPassword,
      
    };
    console.log(myObjCredentials);
    
    return this.httpclient.put<any>(this.url +'auth/login',myObjCredentials);
  }
  logOut(): Observable<any> {
    return this.httpclient.delete<any>(this.url +'auth/logout',
    
    // {headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),}
    )

  }


  tokenRefresh():Observable<any>{
    return this.httpclient.get<any>(this.url +'auth/refresh',
    // {headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),}
    )

  }


  getUserLogeado():Observable<any>{
    const idContact = 123;
    return this.httpclient.get(this.url +'users/profile/' + idContact,
   
  );
  }
  registerNewUser(data:any){
    return this.httpclient.post<any>(this.url +'users/create',data,)
  }

  updateUser(data:any, idUser:number){
    return this.httpclient.put<any>(this.url +'users/update/' + data, idUser,
    // {headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),}
    )
  }

  

}


