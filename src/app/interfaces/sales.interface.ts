export interface BuyResp {
  status: string;
  buys: Buys;
}

export interface Buys {
  count: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
  rows: RowBuys[];
}

export interface RowBuys {
  id: number;
  quantity: number;
  total_price: number;
  client_id: number;
  product_id: number;
  lot_id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  product: Product;
  lot: Lot;
}

export interface Client {
  id: number;
  name: string;
  surname: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lot {
  id: number;
  quantity_liters: number;
  code: string;
  discount: number;
  discount_reason: string;
  cost_liter: number;
  reused_bottles: number;
  lot_total_cost: number;
  lot_type_id: number;
  company_id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  title: string;
  code: string;
  description: string;
  price: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id?: 0;
  client_id: '';
  product_id: '';
  lot_id: '';
  quantity: 0;
  total_price: 0;
}
