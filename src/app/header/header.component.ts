import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
})
export class HeaderComponent {}
