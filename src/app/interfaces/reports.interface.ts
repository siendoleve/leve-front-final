export interface EconomicAssetsResp {
  economicAssets: EconomicAsset[];
}

export interface EconomicAsset {
  id: number;
  name: string;
  value: number;
  company_id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseResp {
  purchases: Purchase[];
}

export interface Purchase {
  product_id: number;
  total_quantity: string;
  total_price: number;
  product_title: string;
}

export interface IncomeResp {
  incomes: Income[];
}

export interface Income {
  total: number;
  income_type_name: string;
}

export interface SpentsResp {
  spents: Spent[];
}

export interface Spent {
  total: number;
  spent_type_name: string;
}

export interface ProfitResp {
  baseMoney: number;
  assets: number;
  workingCapital: number;
  totalBuy: number;
  totalSpent: number;
  utility: number;
}

export interface ReusedBottle {
  status: string;
  reusedBottle: null | number;
}
