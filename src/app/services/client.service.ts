import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from './../../environments/environment.prod';
import { environment } from './../../environments/environment';
import { Client, ClientResp } from '../interfaces/client.interface';
import { tokenHeader } from '../utils/getConfig';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getClient(id: number): Observable<ClientResp> {
    return this.http.get<ClientResp>(`${base_url}/client/${id}`, {
      headers: tokenHeader.headers,
    });
  }

  getAllClientByTerm(name: string, page: number): Observable<ClientResp> {
    const params = new HttpParams().set('limit', 5).set('page', page);

    return this.http.get<ClientResp>(`${base_url}/client/name/${name}`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  getClients(page: number, limit: number = 5): Observable<ClientResp> {
    const params = new HttpParams().set('limit', limit).set('page', page);

    return this.http.get<ClientResp>(`${base_url}/client`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  createClient(client: Client): Observable<ClientResp> {
    return this.http.post<ClientResp>(`${base_url}/client`, client, {
      headers: tokenHeader.headers,
    });
  }

  updateClient(client: Client, id: number): Observable<ClientResp> {
    return this.http.patch<ClientResp>(`${base_url}/client/${id}`, client, {
      headers: tokenHeader.headers,
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${base_url}/client/${id}`, {
      headers: tokenHeader.headers,
    });
  }
}
