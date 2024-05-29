import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  private urlToPostUser: string = 'https://localhost:7217/api/Users';
  private urlToToSendEmail: string = 'https://localhost:7217/api/Registration/register';
  private urlToVerifyLogin: string = 'https://localhost:7217/api/Users/check-user';

  postUser(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlToPostUser, user);
  }

  sendEmail(UserID: number, Email: string): Observable<any> {
    return this.http.post<any>(this.urlToToSendEmail, {UserID, Email});
  }

  checkUser(Email: string, Password: string): Observable<any> {
    const body = {Email, Password};
    return this.http.post(this.urlToVerifyLogin, body);
  }
}
