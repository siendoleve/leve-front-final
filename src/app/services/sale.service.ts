import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tokenHeader } from '../utils/getConfig';
import { RowBuys, Sale, BuyResp } from '../interfaces/sales.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}

  /**
   * This function takes an id as a parameter and returns an observable of type RowBuys
   * @param {string} id - The id of the sale you want to get.
   * @returns The sale with the id that was passed in.
   */
  getSaleById(id: string): Observable<RowBuys> {
    return this.http.get<RowBuys>(`${base_url}/buy/${id}`, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It returns an Observable of type BuyResp, which is a response from the server
   * @param {number} offset - The number of items to skip before starting to collect the result set.
   * @param {number} [limit=5] - number = 5: This is the number of items to be returned.
   * @returns An observable of type BuyResp
   */
  getSales(page: number, limit: number = 5): Observable<BuyResp> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<BuyResp>(`${base_url}/buy`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * This function is used to get the sales by term
   * @param {string} type - The type of sale you want to get.
   * @param {string} term - The search term
   * @param {number} offset - The offset of the first item to return.
   * @returns An observable of type BuyResp
   */
  getSaleByTerm(
    type: string,
    term: string,
    offset: number
  ): Observable<BuyResp> {
    const params = new HttpParams().set('limit', 5).set('offset', offset);
    return this.http.get<BuyResp>(`${base_url}/buy/${type}/${term}`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It takes a sale object as a parameter, and returns an observable of type any
   * @param {Sale} sale - Sale - this is the sale object that we are sending to the backend.
   * @returns Observable<any>
   */
  createSale(sale: Sale): Observable<any> {
    return this.http.post<any>(`${base_url}/buy`, sale, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * This function takes in a sale object and an id string, and returns an observable of any type
   * @param {Sale} sale - Sale - the sale object that we want to update
   * @param {string} id - The id of the sale you want to update.
   * @returns The updated sale.
   */
  updateSale(sale: Sale, id: number): Observable<any> {
    return this.http.patch<any>(`${base_url}/buy/${id}`, sale, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It deletes a sale from the database
   * @param {string} id - The id of the sale you want to delete.
   * @returns an observable of type any.
   */
  deleteSale(id: number): Observable<any> {
    return this.http.delete<any>(`${base_url}/buy/${id}`, {
      headers: tokenHeader.headers,
    });
  }
}
