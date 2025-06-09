import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contactField } from '../contactField';


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  apiUrl = "http://localhost:3000/contactJson"

  constructor(private http:HttpClient) { }

  getAll(): Observable<contactField[]> {
    return this.http.get<contactField[]>(this.apiUrl);
  }

  selectById(contacts: contactField): Observable<contactField> {
    return this.http.get<contactField>(`${this.apiUrl}/${contacts.id}`);
  }

  selectByFavorite(): Observable<contactField[]> {
    return this.http.get<contactField[]>(`${this.apiUrl}?favorite=true`);
  }

  save(contacts: contactField): Observable<contactField>{
    return this.http.post<contactField>(this.apiUrl, contacts);
  }

  delete(contacts:contactField): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${contacts.id}`)
  }

  update(contacts:contactField): Observable<contactField>{
    return this.http.put<contactField>(`${this.apiUrl}/${contacts.id}`, contacts)
  }
}
