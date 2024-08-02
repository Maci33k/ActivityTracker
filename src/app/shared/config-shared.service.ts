import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigSharedService {

  //User Config
  height: number = 0;
  weight: number = 0;
  gender: string = '';
  fitness: string = '';

  //Tracked activities configuration
  steps: boolean = false;
  calories: boolean = false;
  water: boolean = false;
  sleepTime: boolean = false;
  training: boolean = false;

  constructor() { }
}
