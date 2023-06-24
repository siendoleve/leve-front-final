import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
import { Spent, Expense, ExpenseResp } from '../interfaces/expense.interface';
import { tokenHeader } from '../utils/getConfig';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  /**
   * It returns an observable of an array of ExpenseResp objects
   * @returns An observable of an array of ExpenseResp objects.
   */
  getAllExpenses(page: number): Observable<ExpenseResp> {
    const params = new HttpParams().set('limit', 5).set('page', page);

    return this.http.get<ExpenseResp>(`${base_url}/spent`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an observable of an array of ExpenseResp objects
   * @returns An observable of an array of ExpenseResp objects.
   */
  getAllExpensesByType(
    term: number,
    page: number,
    limit: number = 5
  ): Observable<ExpenseResp> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http.get<ExpenseResp>(`${base_url}/spent/type/${term}`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * This function takes an id as a parameter and returns an observable of type ExpenseResp
   * @param {string} id - The id of the expense you want to get.
   * @returns Observable<ExpenseResp>
   */
  getExpensesById(id: string): Observable<Spent> {
    return this.http.get<Spent>(`${base_url}/spent/${id}`, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It takes an expense object, and returns an observable of type ExpenseResp
   * @param {Expense} expense - Expense - this is the expense object that we are sending to the
   * backend.
   * @returns Observable<ExpenseResp>
   */
  createExpense(expense: Expense): Observable<Spent> {
    return this.http.post<Spent>(`${base_url}/spent`, expense, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * This function takes an expense object and an id string as arguments and returns an observable of
   * type ExpenseResp
   * @param {Expense} expense - Expense - this is the expense object that we want to update.
   * @param {string} id - The id of the expense you want to update.
   * @returns Observable<ExpenseResp>
   */
  updateExpense(expense: Expense, id: number): Observable<Spent> {
    return this.http.patch<Spent>(`${base_url}/spent/${id}`, expense, {
      headers: tokenHeader.headers,
    });
  }

  /**
   * It takes an id as a parameter, and then it makes a delete request to the backend, passing the id
   * as a parameter
   * @param {string} id - The id of the expense to be deleted.
   * @returns Observable<any>
   */
  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${base_url}/spent/${id}`, {
      headers: tokenHeader.headers,
    });
  }

  createExpensePerLot(lotId: number, expenseId: number): Observable<any> {
    return this.http.post(
      `${base_url}/spent-per-lot`,
      {
        lot_id: lotId,
        spent_id: expenseId,
      },
      {
        headers: tokenHeader.headers,
      }
    );
  }

  deleteExpensePerLot(lotId: number) {
    console.log('me ejecute');
    return this.http.delete(`${base_url}/spent-per-lot/${lotId}`, {
      headers: tokenHeader.headers,
    });
  }

  getSpentsTypes(): Observable<any> {
    return this.http.get(`${base_url}/spent-type`, {
      headers: tokenHeader.headers,
    });
  }
}
