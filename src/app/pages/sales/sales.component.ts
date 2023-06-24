import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, ClientResp } from 'src/app/interfaces/client.interface';
import { LotResp, Row } from 'src/app/interfaces/lot.interface';
import { ProductDetail } from 'src/app/interfaces/product.interface';
import { RowBuys, Sale } from 'src/app/interfaces/sales.interface';
import { ClientService } from 'src/app/services/client.service';
import { LotService } from 'src/app/services/lot.service';
import { ProductService } from 'src/app/services/product.service';
import { SaleService } from 'src/app/services/sale.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  public formSubmitted: boolean = false;
  public showAlertSuccess: boolean = false;
  public showAlertError: boolean = false;
  public messageAlert: string = '';
  public lots: Row[] = [];
  public clients: Client[] = [];
  public products: ProductDetail[] = [];
  public sales: RowBuys[] = [];

  public page!: number;
  public currentPage: number = 1;
  public currentPageSearch: number = 1;

  public showPagination: boolean = true;

  public type!: string;
  public typeLots: any[] = [];

  public term: string = '';
  public term2: string = '';

  public role: string = '';

  public salesForm = this.fb.group({
    id: 0,
    client_id: [0, Validators.required],
    product_id: [0, Validators.required],
    lot_id: [0, Validators.required],
    quantity: [0, Validators.required],
    total_price: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private clientService: ClientService,
    private lotService: LotService,
    private productService: ProductService,
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getLots();
    this.getProducts();
    this.getSales();
    this.redirectTo();
    this.getTypeLots();
  }

  getTypeLots() {
    this.lotService.getTypeLots().subscribe({
      next: (resp: any) => {
        this.typeLots = resp.typesLots;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  /**
   * The function redirectTo() is called in the ngOnInit() function. It calls the getInfo() function in
   * the userService.ts file. The getInfo() function returns the user's role. If the user's role is not
   * admin, the user is redirected to the dashboard/clients page
   */
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
   * The function calls the getProducts() method of the productService, which returns an observable.
   * The observable is subscribed to, and the next and error functions are defined. The next function
   * sets the products property of the component to the response from the server. The error function
   * calls the handlingError() function, which is defined in the base class
   */
  getProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp.products;
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * The function getClients() is a function that calls the getClients() function from the
   * clientService.ts file. The getClients() function from the clientService.ts file returns an
   * observable. The getClients() function from the client.component.ts file subscribes to the
   * observable returned by the getClients() function from the clientService.ts file. The getClients()
   * function from the client.component.ts file then assigns the value returned by the getClients()
   * function from the clientService.ts file to the clients variable
   */
  getClients() {
    this.clientService.getClients(1, 100000000).subscribe({
      next: (resp) => {
        this.clients = resp.clients;
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * The function calls the getSales() function from the saleService, which returns an observable. The
   * observable is subscribed to, and the next and error functions are defined. The next function sets
   * the sales variable to the response from the observable. The error function calls the
   * handlingError() function, which is defined in the base component class
   */
  getSales() {
    this.currentPageSearch = 1;
    this.saleService.getSales(this.currentPage).subscribe({
      next: (resp) => {
        console.log(resp);
        this.showPagination = true;
        this.page = resp.buys.currentPage;
        this.sales = resp.buys.rows;
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * The function getLots() is a function that is called when the component is initialized. It calls the
   * getLots() function in the lotService.ts file, which makes a GET request to the API. The response is
   * then stored in the lots variable
   */
  getLots() {
    this.lotService.getLots(1, 10).subscribe({
      next: (resp) => {
        console.log(resp);
        this.lots = resp.lot.rows;
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * It gets the sales by term, and if the type is product, it gets the sales by term and the term2,
   * and if the type is client, it gets the sales by term and the term
   * @param {string} type - string - The type of search you want to do.
   */
  getSalesByTerm(type: string) {
    this.currentPage = 1;
    if (type === 'product') {
      this.type = 'product';
      if (this.term2.length === 0) return;
      if (this.term2 === 'todos') return this.getSales();
      this.saleService
        .getSaleByTerm(type, this.term2, this.currentPageSearch)
        .subscribe({
          next: (resp) => {
            this.showPagination = false;
            this.page = resp.buys.currentPage;
            this.sales = resp.buys.rows;
          },
          error: ({ error }) => {
            this.handlingError(error);
          },
        });
    }

    if (type === 'client') {
      this.type = 'client';

      if (this.term.length === 0) return;
      this.saleService
        .getSaleByTerm(type, this.term, this.currentPageSearch)
        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.showPagination = false;
            this.page = resp.buys.currentPage;
            this.sales = resp.buys.rows;
          },
          error: ({ error }) => {
            console.log(error);
            this.handlingError(error);
          },
        });
    }
  }

  /**
   * If the form is valid, then either create a new sale or update an existing one
   * @returns the value of the form.
   */
  submit() {
    this.formSubmitted = true;

    if (this.salesForm.invalid) {
      this.alertVerifyForm('El formulario no es correcto');
      return;
    }
    const formValues: any = this.salesForm.value;
    const requiredFields = ['client_id', 'product_id', 'quantity', 'lot_id'];

    if (requiredFields.some((field) => formValues[field] === 0)) {
      this.alertVerifyForm('El formulario no es correcto');
      return;
    }

    if (this.salesForm.value.id === 0) {
      delete this.salesForm.value.id;
      this.createSale();
    } else {
      const id = this.salesForm.value.id;
      delete this.salesForm.value.id;
      this.updateSale(id as number);
    }

    this.deselectSale();
  }

  /**
   * The function creates a sale by calling the createSale() method of the saleService, which returns
   * an observable. The observable is subscribed to, and the next() and error() functions are called
   * depending on the response
   */
  createSale() {
    this.saleService.createSale(this.salesForm.value as any).subscribe({
      next: (resp) => {
        this.getSales();
        this.alertSuccessForm('La venta ha sido creada con exito!');
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * The function updateSale() is a method of the class SalesComponent. It takes an id of type string
   * as a parameter. It calls the updateSale() method of the saleService object, passing the value of
   * the salesForm object and the id as parameters. It subscribes to the observable returned by the
   * updateSale() method of the saleService object. If the observable returns a value, the function
   * calls the getSales() method of the SalesComponent class and the alertSuccessForm() method of the
   * SalesComponent class, passing a string as a parameter. If the observable returns an error, the
   * function calls the handlingError() method of the SalesComponent class, passing the error as a
   * parameter
   * @param {string} id - string
   */
  updateSale(id: number) {
    this.saleService.updateSale(this.salesForm.value as any, id).subscribe({
      next: (resp) => {
        this.getSales();
        this.alertSuccessForm('La venta ha sido actualizada con exito');
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  /**
   * The function takes a SalesResp object as a parameter and sets the values of the form fields to the
   * values of the properties of the SalesResp object
   * @param {SalesResp} sale - SalesResp - this is the object that is passed to the function.
   */
  selectSale(sale: RowBuys) {
    this.salesForm.setValue({
      id: +sale.id,
      client_id: sale.client_id,
      product_id: +sale.product_id,
      lot_id: sale.lot_id,
      quantity: sale.quantity,
      total_price: sale.total_price,
    });
  }

  /**
   * It sets the form's value to an empty object, and sets the formSubmitted variable to false
   */
  deselectSale() {
    this.salesForm.setValue({
      id: 0,
      client_id: 0,
      product_id: 0,
      lot_id: 0,
      quantity: 0,
      total_price: 0,
    });

    this.formSubmitted = false;
  }

  /**
   * The function deleteSale() is a function that deletes a sale from the database
   * @param {string} id - string
   */
  deleteSale(id: number) {
    this.saleService.deleteSale(+id).subscribe({
      next: (resp) => {
        this.getSales();
        this.alertSuccessForm('La venta ha sido eliminada con exito!');
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
  }

  calculatePrice() {
    const product = this.products.find(
      (product) => product.id === this.salesForm.value.product_id
    );

    const total_price = product?.price! * this.salesForm.value.quantity!;

    this.salesForm.patchValue({
      total_price,
    });
  }

  /**
   * If the current page is less than or equal to 0, return. Otherwise, subtract 5 from the current
   * page and call the getSales() function
   * @returns The current page is being returned.
   */
  back() {
    if (this.currentPage <= 1) return;
    this.currentPage = this.currentPage - 1;
    this.getSales();
  }

  /**
   * If the current page is greater than or equal to the page times 2, return. Otherwise, add 5 to the
   * current page and call the getSales function
   * @returns The current page number.
   */
  next() {
    console.log(this.currentPage);
    if (this.currentPage >= this.page * 2) return;
    this.currentPage = this.currentPage + 1;
    this.getSales();
  }

  /**
   * This function is called when the user clicks the back button on the search page. It checks to see
   * if the current page is less than or equal to 0, and if it is, it returns. If it isn't, it
   * subtracts 5 from the current page and calls the getSalesByTerm function
   * @returns The current page number is being returned.
   */
  backSearch() {
    if (this.currentPageSearch <= 0) return;
    this.currentPageSearch = this.currentPageSearch - 5;
    this.getSalesByTerm(this.type);
  }

  /**
   * If the current page is greater than or equal to the page times 2, return. Otherwise, add 5 to the
   * current page and get the sales by term
   * @returns The current page number is being returned.
   */
  nextSearch() {
    console.log(this.currentPageSearch);
    if (this.currentPageSearch >= this.page * 2) return;
    this.currentPageSearch = this.currentPageSearch + 5;
    this.getSalesByTerm(this.type);
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
   * @param {string} msg - string - The message you want to display in the alert.
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
