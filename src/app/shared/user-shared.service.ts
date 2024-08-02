import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {
  userID: number | null = null;
  email: string | null = null;
  username: string | null = null;
  name: string | null = null;
  surname: string | null = null;
  gender: string | null = null;
  age: number | null = null;
  city: string | null = null;
  userConfigID: number | null = null;

  constructor() { }
}
