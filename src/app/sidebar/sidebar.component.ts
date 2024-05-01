import { Component } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MainPageComponent,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarOpen = false;

  openNav() {
    this.sidebarOpen = true;
  }

  closeNav() {
    this.sidebarOpen = false;
  }
}
