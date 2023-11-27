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

  getAllContacts(): Observable<any> {
    return this.httpclient.put<any>(
      this.url + `contacts`,
      { offset: 1, limit: 10, searchTerm: '' },
      {headers:this.headers.set('Authorization', 'Bearer '+ '12345678at')}
    );
  }

  createContact(): Observable<any> {
    return this.httpclient.post<any>(this.url + `users/create/`, {
      headers: this.headers,
    });
  }
  updateContact(idContact: number): Observable<any> {
    return this.httpclient.put<any>(this.url + `update/${idContact}`, {
      headers: this.headers,
    });
  }

  deleteContact(idContact: number): Observable<any> {
    return this.httpclient.delete<any>(this.url + `delete/${idContact}`, {
      headers: this.headers,
    });
  }
}
