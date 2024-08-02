import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  icons = [
    { name: 'Kroki', class: 'fa-solid fa-shoe-prints', state: 'active' },
    { name: 'Kalorie', class: 'fa-solid fa-fire', state: 'active' },
    { name: 'Woda', class: 'fa-solid fa-droplet', state: 'active' },
    { name: 'Trening', class: 'fa-solid fa-person-running', state: 'active' },
    { name: 'Sen', class: 'fa-solid fa-moon', state: 'active' }
  ]

  constructor() { }
}
