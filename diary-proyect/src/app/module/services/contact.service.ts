import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private numContacts = new BehaviorSubject<number>(0);
  numContacts$ = this.numContacts.asObservable();

  public url = environment.URL_API;

  constructor(private httpclient: HttpClient) {}
  // headers = new HttpHeaders().set('x-api-key', '7802c4c0');

  getAllContacts(data: any): Observable<any> {
    return this.httpclient.put<any>(
      this.url + `contacts`,
      { offset: 1, limit: 10, searchTerm: '' },
      // { headers: this.headers.set('Authorization', 'Bearer ' + '12345678at') }
    );
  }

  createContact(data: any): Observable<any> {
    this.numContacts.next(this.numContacts.value + 1);

    return this.httpclient.post<any>(this.url + `contacts/create`, data, {
      // headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),
    });
  }

  updateContact(idContact: number, data: any): Observable<any> {
    return this.httpclient.put<any>(
      this.url + `/contacts/update/${idContact}`,data, 
      // { headers: this.headers.set('Authorization', 'Bearer ' + '12345678at') }
    );
  }

  deleteContact(idContact: number): Observable<any> {
    this.numContacts.next(this.numContacts.value - 1);

    return this.httpclient.delete<any>(
      this.url + `contacts/delete/` + idContact,
      // { headers: this.headers.set('Authorization', 'Bearer ' + '12345678at') }
    );
  }
}
