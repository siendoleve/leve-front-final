import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Spent,
  ExpenseResp,
  Expense,
} from 'src/app/interfaces/expense.interface';
import { ExpensesService } from 'src/app/services/expenses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  public formSubmitted: boolean = false;
  public showAlertSuccess: boolean = false;
  public showAlertError: boolean = false;
  public messageAlert: string = '';
  public expenses!: Spent[];
  public term: string = '';
  public page: number = 1;
  public currentPage: number = 1;
  public currentPageSearch: number = 1;
  public showPagination: boolean = true;
  public role!: string;
  public spentstypes: any[] = [];

  public expensesForm = this.fb.group({
    id: 0,
    description: ['', Validators.required],
    value: [0, Validators.required],
    spent_type_id: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private expensesService: ExpensesService,
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllExpenses();
    this.redirectTo();
    this.getSpentsTypes();
  }

  getSpentsTypes() {
    this.expensesService.getSpentsTypes().subscribe({
      next: (resp: any) => {
        this.spentstypes = resp.spentTypes;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
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

  /**
   * The function calls the getAllExpenses() function from the expensesService, which returns an
   * observable. The observable is subscribed to, and the next function is called when the observable
   * returns a response. The response is then logged to the console, and the expenses variable is set
   * to the response
   */
  getAllExpenses() {
    this.showPagination = true;
    this.currentPageSearch = 1;
    this.expensesService.getAllExpenses(this.currentPage).subscribe({
      next: (resp) => {
        console.log(resp);
        this.page = +resp.pagination.currentPage;
        this.expenses = resp.spents;
        this.showPagination = true;
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  back() {
    if (this.currentPage <= 1) return;
    this.currentPage = this.currentPage - 1;
    this.getAllExpenses();
  }

  next() {
    if (this.currentPage >= this.page * 2) return;
    this.currentPage = this.currentPage + 1;
    this.getAllExpenses();
  }

  backSearch() {
    if (this.currentPageSearch <= 1) return;
    this.currentPageSearch = this.currentPageSearch - 1;
    this.getAllExpensesByType();
  }

  nextSearch() {
    console.log(this.currentPageSearch);
    if (this.currentPageSearch >= this.page * 2) return;
    this.currentPageSearch = this.currentPageSearch + 1;
    this.getAllExpensesByType();
  }

  getAllExpensesByType() {
    this.showPagination = false;
    this.currentPage = 1;
    if (this.term.length === 0) return;

    if (this.term === 'todos') {
      return this.getAllExpenses();
    }

    this.expensesService
      .getAllExpensesByType(+this.term, this.currentPageSearch)
      .subscribe({
        next: (resp) => {
          this.page = +resp.pagination.currentPage;
          this.expenses = resp.spents;
          this.showPagination = false;
        },
        error: ({ error }) => {
          this.handlingError(error);
        },
      });
  }

  /**
   * If the form is valid, then either create a new expense or update an existing one
   * @returns the value of the form.
   */
  submit() {
    this.formSubmitted = true;

    if (this.expensesForm.invalid) {
      this.alertVerifyForm('El formulario no es correcto');
      return;
    }

    if (this.expensesForm.value.id === 0) {
      delete this.expensesForm.value.id;
      this.createExpense();
    } else {
      const id = this.expensesForm.value.id;
      delete this.expensesForm.value.id;
      this.updateExpense(id as number);
    }

    this.deselectExpense();
  }

  /**
   * We call the createExpense() method from the expensesService, passing the form value as an Expense
   * object
   */
  createExpense() {
    console.log(this.expensesForm.value);
    this.expensesService
      .createExpense(this.expensesForm.value as Expense)
      .subscribe({
        next: (resp) => {
          this.getAllExpenses();
          this.alertSuccessForm('Gasto creado con exito!');
        },
        error: ({ error }) => {
          console.log(error);
          this.handlingError(error);
        },
      });
  }

  /**
   * The function updateExpense() is a method of the class ExpensesComponent. It takes an id as a
   * parameter and returns nothing
   * @param {string} id - string
   */
  updateExpense(id: number) {
    this.expensesService
      .updateExpense(this.expensesForm.value as Expense, id as number)
      .subscribe({
        next: (resp: any) => {
          this.getAllExpenses();
          this.alertSuccessForm('Gasto actualizado con exito!');
        },
        error: (error: any) => {
          this.handlingError(error);
        },
      });
  }

  /**
   * The function takes an expense object as a parameter and sets the form values to the expense
   * object's properties
   * @param {ExpenseResp} expenseSelected - ExpenseResp
   */
  selectExpense(expenseSelected: Spent) {
    this.expensesForm.setValue({
      id: +expenseSelected.id,
      description: expenseSelected.description,
      value: expenseSelected.value,
      spent_type_id: +expenseSelected.spent_type_id,
    });
  }

  /**
   * It sets the form's value to an empty object, and sets the formSubmitted property to false
   */
  deselectExpense() {
    this.expensesForm.setValue({
      id: 0,
      description: '',
      value: 0,
      spent_type_id: 0,
    });
    this.formSubmitted = false;
  }

  /**
   * We call the deleteExpense method from the expensesService, which returns an observable, and we
   * subscribe to it. If the observable returns a response, we call the getAllExpenses method to update
   * the list of expenses, and we call the alertSuccessForm method to show a success message. If the
   * observable returns an error, we call the handlingError method to show an error message
   * @param {string} id - string
   */
  deleteExpense(id: number) {
    this.expensesService.deleteExpense(id).subscribe({
      next: (resp) => {
        this.getAllExpenses();
        this.alertSuccessForm('Gasto eliminado con exito!');
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * If the field is invalid and the form has been submitted, return true. Otherwise, return false
   * @param {string} field - The name of the field that you want to check.
   * @returns A boolean value.
   */
  invalidFields(field: string): boolean {
    if (this.expensesForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function is used to display an error message to the user when the form is not filled out
   * correctly
   * @param {string} msg - string - The message to be displayed in the alert.
   */
  alertVerifyForm(msg: string) {
    this.showAlertError = true;
    this.messageAlert = msg;
    setTimeout(() => {
      this.showAlertError = false;
    }, 3500);
  }

  /**
   * This function is used to show a success message to the user when a form is submitted successfully
   * @param {string} msg - string - The message you want to display
   */
  alertSuccessForm(msg: string) {
    this.showAlertSuccess = true;
    this.messageAlert = msg;
    setTimeout(() => {
      this.showAlertSuccess = false;
    }, 3500);
  }

  /**
   * It takes an error object as a parameter, logs the error to the console, sets the messageAlert
   * property to the error message, and sets the showAlertError property to true
   * @param {any} error - any - The error object that is returned from the server.
   */
  handlingError(error: any) {
    console.log(error);
    let msgError = '';
    this.showAlertError = true;
    if (typeof error.message == 'string') {
      msgError = error.message;
    } else {
      error.message.forEach((msg: string) => {
        msgError += ` ${msg} and`;
      });
    }
    this.messageAlert = msgError;
    setTimeout(() => {
      this.showAlertError = false;
    }, 3500);
  }
}
