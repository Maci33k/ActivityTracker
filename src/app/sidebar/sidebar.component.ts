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
  icons = [
    { name: 'Twój dzień', class: 'fa-solid fa-calendar-days' },
    { name: 'Znajomi', class: 'fa-solid fa-user-group' },
    { name: 'Osiągnięcia', class: 'fa-solid fa-trophy' },
    { name: 'Dziennik', class: 'fa-solid fa-book' },
    { name: 'Monitor kalorii', class: 'fa-solid fa-utensils' },
    { name: 'Profil', class: 'fa-solid fa-user' },
    { name: 'Ustawienia', class: 'fa-solid fa-gear' }
  ]

  openNav() {
    this.sidebarOpen = true;
  }

  closeNav() {
    this.sidebarOpen = false;
  }
}
