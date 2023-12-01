import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public url = environment.URL_API;

  constructor(private httpclient: HttpClient) {}
  headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  getAllContacts(data:any): Observable<any> {
    return this.httpclient.put<any>(
      this.url + `contacts`,
      { offset: 1, limit: 10, searchTerm: '' },
      {headers:this.headers.set('Authorization', 'Bearer '+ '12345678at')}
    );
  }

  createContact(data:any): Observable<any> {
    console.log(data);
    
    return this.httpclient.post<any>(this.url + `contacts/create`, 
    data,
    {headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),}
  );}

  updateContact(idContact: number): Observable<any> {
    return this.httpclient.put<any>(this.url + `update/${idContact}`, {
      headers: this.headers,
    });
  }

  deleteContact(idContact: number): Observable<any> {
    return this.httpclient.delete<any>(this.url + `contacts/delete/` + idContact, 
      {headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),}
    );
  }

  

}
