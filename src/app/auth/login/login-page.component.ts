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
import { translations } from 'src/locale/translations';

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
  form!: FormGroup;
  isMobile = false;

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    public breakpointService: BreakpointService
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
}
