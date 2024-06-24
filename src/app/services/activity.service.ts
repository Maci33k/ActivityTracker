import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityModel } from '../models/activity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  urlToPost: string = 'https://localhost:7217/api/ActivityData';
  urlToCheckIfRecordExists: string = 'https://localhost:7217/api/ActivityData/check-if-exists';
  urlToUpdateRecord: string = 'https://localhost:7217/api/ActivityData';
  urlToGetTodaysRecordID: string = 'https://localhost:7217/api/ActivityData/GetID';

  createRecord(activityModel: ActivityModel): Observable<any> {
    return this.http.post(this.urlToPost, activityModel);
  }

  checkIfRecordExists() {
    return this.http.get(this.urlToCheckIfRecordExists);
  }

  updateRecord(id: number, activityModel: ActivityModel): Observable<any> {
    return this.http.put(`${this.urlToUpdateRecord}/${id}`, activityModel)
  }

  getTodaysRecordID(): Observable<number> {
    return this.http.get<number>(this.urlToGetTodaysRecordID);
  }
}
