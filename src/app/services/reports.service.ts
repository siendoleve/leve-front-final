import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenHeader } from '../utils/getConfig';
import {
  EconomicAssetsResp,
  IncomeResp,
  ProfitResp,
  PurchaseResp,
  ReusedBottle,
  SpentsResp,
} from '../interfaces/reports.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  getIncomeReport(startDate: string, endDate: string): Observable<IncomeResp> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<IncomeResp>(`${base_url}/report/income`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  getSpentReport(startDate: string, endDate: string): Observable<SpentsResp> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SpentsResp>(`${base_url}/report/spent`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  getBuyReport(startDate: string, endDate: string): Observable<PurchaseResp> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<PurchaseResp>(`${base_url}/report/buy`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  getEconomicAssetReport(
    startDate: string,
    endDate: string
  ): Observable<EconomicAssetsResp> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<EconomicAssetsResp>(
      `${base_url}/report/economic-assets`,
      {
        headers: tokenHeader.headers,
        params,
      }
    );
  }

  getGeneralReports(
    startDate: string,
    endDate: string
  ): Observable<ProfitResp> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<ProfitResp>(`${base_url}/report/profit`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  getReusedBottleReport(
    startDate: string,
    endDate: string
  ): Observable<ReusedBottle> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<ReusedBottle>(
      `${base_url}/report/report-reused-bottle`,
      {
        headers: tokenHeader.headers,
        params,
      }
    );
  }
}
