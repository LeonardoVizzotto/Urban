import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { throwError, Observable } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';
import { ROUTES } from '../routes.constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: [
      '',
      Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.email,
      ]),
    ],
    password: [
      '',
      Validators.compose([Validators.minLength(5), Validators.required]),
    ],
  });

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder // private toastr: ToastrService // TODO implement toaster
  ) {}

  login() {
    this.authService
      .login(this.email.value, this.password.value)
      .pipe(
        take(1),
        catchError((error) => this.handleError(error))
      )
      .subscribe(() => this.router.navigate([ROUTES.SLOTS]));
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get emailErrorMessage(): string {
    if (this.email.hasError('email')) {
      return 'email must be valid';
    }

    return 'Minimum 5 characters';
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  handleError(error: Error): Observable<any> {
    // this.toastr.error(error);
    return throwError(error);
  }
}
