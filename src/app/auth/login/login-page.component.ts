import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from 'src/app/header/public/header.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'baam-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    ErrorMessageComponent,
  ],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  isMobile = false;
  showPassword = false;
  loading = false;
  formHasError = false;
  errorMsgKey = 'required';
  codeSent = false;
  timer = 90;
  showTimer = false;
  codeForm = this.fb.group({
    code: ['', Validators.required],
  });
  get username() {
    return this.form.get('username');
  }
  get code() {
    return this.codeForm.get('code');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    public breakpointService: BreakpointService,
    private authService: AuthService,
    private router: Router
  ) {
    this.breakpointService.isMobile$.subscribe(
      (isMobile) => (this.isMobile = isMobile)
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.showTimer = false;
        clearInterval(interval);
        return;
      }
    }, 1000);
  }
  backToLogin() {
    this.timer = 90;
    this.codeSent = false;
  }
  submit(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.codeSent = true;
        this.showTimer = true;
        this.startTimer();
      },
      error: ({ error }) => {
        this.errorMsgKey = error.data;
        this.formHasError = true;
        this.password?.setErrors({ required: error.data });
        this.loading = false;
      },
    });
  }
}
