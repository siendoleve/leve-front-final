import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tokenHeader } from '../utils/getConfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lot, LotResp } from '../interfaces/lot.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class LotService {
  constructor(private http: HttpClient) {}

  /**
   * This function takes a string as a parameter and returns an Observable of type LotResp
   * @param {string} term - The term to search for.
   * @returns An observable of type LotResp
   */
  getLot(id: number): Observable<LotResp> {
    return this.http.get<LotResp>(
      `
    ${base_url}/lot/${id}`,
      {
        headers: tokenHeader.headers,
      }
    );
  }

  /**
   * It returns an observable of an array of LotResp objects
   * @returns An observable of an array of LotResp objects.
   */
  getLots(page: number, limit: number = 5): Observable<LotResp> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<LotResp>(
      `
    ${base_url}/lot`,
      {
        headers: tokenHeader.headers,
        params,
      }
    );
  }

  /**
   * This function takes in a type and a term, and returns an observable of an array of LotResp objects
   * @param {string} type - string - the type of lot you want to search for.
   * @param {string} term - The search term
   * @returns An observable of an array of LotResp objects.
   */
  getLotsByTerm(
    type: string,
    term: string,
    page: number,
    limit: number = 5
  ): Observable<LotResp> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<LotResp>(
      `
    ${base_url}/lot/${type}/${term}`,
      {
        headers: tokenHeader.headers,
        params,
      }
    );
  }

  getLotsByType() {}

  /**
   * This function takes a lot object as a parameter and returns an observable of type any
   * @param {Lot} lot - Lot - this is the lot object that we are sending to the backend.
   * @returns Observable<any>
   */
  createLot(lot: Lot): Observable<any> {
    return this.http.post<any>(
      `
    ${base_url}/lot`,
      lot,
      {
        headers: tokenHeader.headers,
      }
    );
  }

  /**
   * This function takes in a lot object and an id string, and returns an observable of any type
   * @param {Lot} lot - Lot - the lot object that we want to update
   * @param {string} id - The id of the lot you want to update.
   * @returns Observable<any>
   */
  updateLot(lot: Lot, id: number): Observable<any> {
    return this.http.patch<any>(
      `
    ${base_url}/lot/${id}`,
      lot,
      {
        headers: tokenHeader.headers,
      }
    );
  }

  /**
   * This function takes in an id as a parameter and returns an observable of type any
   * @param {string} id - the id of the lot you want to delete
   * @returns Observable<any>
   */
  deleteLot(id: number): Observable<any> {
    return this.http.delete<any>(
      `
    ${base_url}/lot/${id}`,
      {
        headers: tokenHeader.headers,
      }
    );
  }

  getTypeLots(): Observable<any> {
    return this.http.get(`${base_url}/typelots`, {
      headers: tokenHeader.headers,
    });
  }
}
