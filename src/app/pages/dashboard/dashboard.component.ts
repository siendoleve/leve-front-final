import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

import { ReportLotExpenseProceeds } from 'src/app/interfaces/lot.interface';
import {
  EconomicAsset,
  Income,
  ProfitResp,
  Purchase,
  ReusedBottle,
  Spent,
} from 'src/app/interfaces/reports.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public incomes!: Income[];
  public spents!: Spent[];
  public purchases!: Purchase[];
  public economicAssets!: EconomicAsset[];
  public profitReport!: ProfitResp;
  public resuedBottle!: number | null;

  public role!: string;
  // public expensesVsProceeds!: number;
  // title = 'Analisis de Gasto - Ganancia'
  // type: any = 'ColumnChart';
  // data = [
  //   ['2012', 900, 390],
  //   ['2013', 1000, 400],
  //   ['2014', 1170, 440],
  //   ['2015', 1250, 480],
  //   ['2016', 1530, 540],
  // ];
  // columnNames: any = ['Year', 'Asia', 'Europe'];
  // options = {};
  // width = 550;
  // height = 400;
  public reportForm = this.fb.group({
    startDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
    endDate: [
      moment().add(1, 'days').format('YYYY-MM-DD'),
      [Validators.required],
    ],
  });

  constructor(
    private reportService: ReportsService,
    private fb: FormBuilder,
    private readonly userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.executeAllReports();
    this.redirectTo();
  }

  redirectTo() {
    this.userService.getInfo().subscribe({
      next: (resp) => {
        this.role = resp.user.role;
        if (resp.user.role !== 'admin') {
          this.router.navigate(['/dashboard/clients']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  executeAllReports() {
    this.getBuyReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getEconomicAssetReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getIncomeReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getSpentReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getGeneralReports(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.reusedBottleReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
  }

  executeAllReportsByPressFilter() {
    console.log('dasdasdasdasdasdad');
    this.getBuyReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getEconomicAssetReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getIncomeReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getSpentReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.getGeneralReports(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
    this.reusedBottleReport(
      this.reportForm.value.startDate!,
      this.reportForm.value.endDate!
    );
  }

  totalReport() {
    console.log('asdasdasda!!!!!!!!!!!!!!');
    this.getBuyReport('2023-03-01', this.reportForm.value.endDate!);
    this.getEconomicAssetReport('2023-03-01', this.reportForm.value.endDate!);
    this.getIncomeReport('2023-03-01', this.reportForm.value.endDate!);
    this.getSpentReport('2023-03-01', this.reportForm.value.endDate!);
    this.getGeneralReports('2023-03-01', this.reportForm.value.endDate!);
    this.reusedBottleReport('2023-03-01', this.reportForm.value.endDate!);
  }

  reusedBottleReport(startDate: string, endDate: string) {
    this.reportService.getReusedBottleReport(startDate, endDate).subscribe({
      next: (resp) => {
        console.log(resp);
        this.resuedBottle = resp.reusedBottle;
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  getGeneralReports(startDate: string, endDate: string) {
    this.reportService.getGeneralReports(startDate, endDate).subscribe({
      next: (resp) => {
        this.profitReport = resp;
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  getIncomeReport(startDate: string, endDate: string) {
    this.reportService.getIncomeReport(startDate, endDate).subscribe({
      next: (resp) => {
        this.incomes = resp.incomes;
        console.log(resp);
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  getSpentReport(startDate: string, endDate: string) {
    this.reportService.getSpentReport(startDate, endDate).subscribe({
      next: (resp) => {
        this.spents = resp.spents;
        console.log(resp);
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  getBuyReport(startDate: string, endDate: string) {
    this.reportService.getBuyReport(startDate, endDate).subscribe({
      next: (resp) => {
        this.purchases = resp.purchases;
        console.log(resp);
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }

  getEconomicAssetReport(startDate: string, endDate: string) {
    this.reportService.getEconomicAssetReport(startDate, endDate).subscribe({
      next: (resp) => {
        this.economicAssets = resp.economicAssets;
        console.log(resp);
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
  }
}
