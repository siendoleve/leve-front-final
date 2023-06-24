import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LotsComponent } from './lots/lots.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    PagesComponent,
    ClientsComponent,
    DashboardComponent,
    ExpensesComponent,
    LotsComponent,
    ProductsComponent,
    SalesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [DashboardComponent, PagesComponent],
})
export class PagesModule {}
