import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScoresModel } from '../models/scores.model';
import { Observable } from 'rxjs';
import { ScoresSharedService } from '../shared/scores-shared.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient, private scoresData: ScoresSharedService) { }

  private urlToPost: string = 'https://localhost:7217/api/Results';
  private urlToGet: string = 'https://localhost:7217/api/Results/user/';

  postScoresRecord(scores: ScoresModel, ActivityDataID: number) {
    return this.http.post(this.urlToPost, scores);
  }

  putStepsScore(stepsScore: number, ActivityDataID: number) {
    return this.http.put(`https://localhost:7217/api/Results/steps/${ActivityDataID}?stepsScore=${stepsScore}`, stepsScore);
  }

  putCaloriesScore(caloriesScore: number, ActivityDataID: number) {
    return this.http.put(`https://localhost:7217/api/Results/calories/${ActivityDataID}?caloriesScore=${caloriesScore}`, caloriesScore);
  }

  putWaterScore(waterScore: number, ActivityDataID: number) {
    return this.http.put(`https://localhost:7217/api/Results/water/${ActivityDataID}?waterScore=${waterScore}`, waterScore);
  }

  putSleepScore(sleepScore: number, ActivityDataID: number) {
    return this.http.put(`https://localhost:7217/api/Results/sleep/${ActivityDataID}?sleepScore=${sleepScore}`, sleepScore);
  }

  putTotalScore(score: number, ActivityDataID: number) {
    this.scoresData.totalScore! += score;
    return this.http.put(`https://localhost:7217/api/Results/total/${ActivityDataID}?totalScore=${this.scoresData.totalScore}`, this.scoresData.totalScore);
  }

  putOverallScore(overallScore: number, ActivityDataID: number) {
    return this.http.put(`https://localhost:7217/api/Results/overall/${ActivityDataID}?overallScore=${overallScore}`, overallScore);
  }

  getScores(userID: number): Observable<any> {
    return this.http.get(`https://localhost:7217/api/Results/user/${userID}`);
  }

  getTodayScoreRecord(activityDataID: number): Observable<any> {
    return this.http.get(`https://localhost:7217/api/Results/activity-data/${activityDataID}/today`);
  }
}
