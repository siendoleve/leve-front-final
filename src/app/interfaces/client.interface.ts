export interface ClientResp {
  status: string;
  count: number;
  clients: Client[];
  pagination: Pagination;
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

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}
