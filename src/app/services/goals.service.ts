import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoalModelToPut } from '../models/goal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http: HttpClient) { }

  urlToGetGoals: string = 'https://localhost:7217/api/Goals/user-id/';

  getGoals(userID: number) {
    return this.http.get(`${this.urlToGetGoals}${userID}`);
  }

  updateStepsGoal(userID: number, steps: number) {
    return this.http.put(`https://localhost:7217/api/Goals/steps/user-id/${userID}?steps=${steps}`, steps);
  }

  updateCaloriesGoal(userID: number, calories: number) {
    return this.http.put(`https://localhost:7217/api/Goals/calories/user-id/${userID}?calories=${calories}`, calories);
  }

  updateWaterGoal(userID: number, water: number) {
    return this.http.put(`https://localhost:7217/api/Goals/water/user-id/${userID}?water=${water}`, water);
  }
}
