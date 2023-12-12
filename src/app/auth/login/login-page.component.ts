import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from 'src/app/header/public/header.component';

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
    MatSidenavModule,
    MatIconModule,
  ],
})
export class LoginPageComponent {
  form = this.fb.group({
    username: [''],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}
}
