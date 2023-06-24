import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public formSubmitted = false;
  public showAlertSuccess = false;
  public showAlertError = false;
  public messageAlert = '';

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  /**
   * If the field is invalid and the form has been submitted, return true. Otherwise, return false
   * @param {string} field - The name of the field you want to check.
   * @returns A boolean value.
   */
  invalidFields(field: string): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * The function is called when the user clicks on the login button. It checks if the form is valid,
   * if it is, it sends the data to the server and if the server responds with a success, it redirects
   * the user to the dashboard
   * @returns The user object
   */
  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      this.alertVerifyForm('El formulario no es correcto');
      return;
    }

    this.userService.login(this.loginForm.value as LoginForm).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/dashboard/abstract');
        this.alertSuccessForm(`Bienvenid@ ${resp.user.name}`);
      },
      error: ({ error }) => {
        this.handlingError(error);
      },
    });
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
   * This function is used to show a success message to the user
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
