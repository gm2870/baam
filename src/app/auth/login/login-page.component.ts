import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/header/public/header.component';

@Component({
  selector: 'baam-login-page',
  templateUrl: 'login-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
})
export class LoginPageComponent {
  form = this.fb.group({
    username: [''],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {}
}
