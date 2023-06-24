export interface Expense {
  id?: string;
  description: string;
  value: number;
  spent_type_id: number;
}

export interface ExpenseResp {
  status: string;
  count: number;
  spents: Spent[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: string;
  itemsPerPage: string;
  totalPages: number;
}

export interface Spent {
  id: number;
  description: string;
  value: number;
  spent_type_id: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
