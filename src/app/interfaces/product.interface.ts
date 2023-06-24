export interface ProductResp {
  status: string;
  products: ProductDetail[];
}

export interface ProductDetail {
  id: number;
  title: string;
  code: string;
  description: string;
  price: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  title: string;
  code: string;
  description: string;
  price: number;
}
