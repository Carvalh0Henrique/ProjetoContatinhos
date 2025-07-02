import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { contactField } from '../contactField';


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  apiUrl = "https://contatinhos.duckdns.org/contato"

  constructor(private http:HttpClient) { }

  getAll(): Observable<contactField[]> {
    return this.http.get<contactField[]>(this.apiUrl);
  }

  selectById(contacts: contactField): Observable<contactField> {
    return this.http.get<contactField>(`${this.apiUrl}/${contacts.id}`);
  }

  selectByFavorite(): Observable<contactField[]> {
    return this.http.get<contactField[]>(this.apiUrl).pipe(
      map(contacts => contacts.filter(c => c.favorite === true))
    );
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

  getFilteredContacts(search?: string, category?: string): Observable<contactField[]> {
    let queryParams = [];

    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

    const query = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this.http.get<contactField[]>(`https://contatinhos.duckdns.org/contato${query}`);
  }


}
