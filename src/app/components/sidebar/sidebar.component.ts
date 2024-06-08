import { Component } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MainPageComponent,
            CommonModule,
            RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router: Router){}
  sidebarOpen = false;
  divWidth = '80%';
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

  navigate(buttonName: string) {
    if(buttonName == 'Znajomi') {
      this.router.navigate(['app/friends']);
    }
    if(buttonName == 'Twój dzień') {
      this.router.navigate(['app/your-day']);
    }
    if(buttonName == 'Dziennik') {
      this.router.navigate(['app/journal']);
    }
    if(buttonName == 'Monitor kalorii') {
      this.router.navigate(['app/callories-monitor']);
    }
    if(buttonName == 'Osiągnięcia') {
      this.router.navigate(['app/achievements']);
    }
    if(buttonName == 'Ustawienia') {
      this.router.navigate(['app/settings']);
    }
    if(buttonName == 'Profil') {
      this.router.navigate(['app/profile']);
    }
  }
}
