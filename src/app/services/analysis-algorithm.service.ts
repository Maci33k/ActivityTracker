import { Injectable } from '@angular/core';
import { ConfigSharedService } from '../shared/config-shared.service';
import { UserSharedService } from '../shared/user-shared.service';
import { ActivitySharedService } from '../shared/activity-shared.service';
import { GoalsSharedService } from '../shared/goals-shared.service';
import { ScoresSharedService } from '../shared/scores-shared.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisAlgorithmService {

  constructor(private configData: ConfigSharedService, private userData: UserSharedService, private activityData: ActivitySharedService,
              private goalsData: GoalsSharedService,
              private scoresData: ScoresSharedService
  ) { }

  totalScore: number = 0;
  stepsScore: number = 0;
  caloriesScore: number = 0;
  sleepScore: number = 0;
  waterScore: number = 0;
  maxScore: number = 0;
  overallScore: number = 0;


  analyzeSteps(steps: number) {

    if(this.userData.age! >= 6 && this.userData.age! <= 17) {
      if(steps >= 12000) {
        this.totalScore += 100;
        this.stepsScore = 100;
      }
      if(steps >= 8000 && steps <= 11999) {
        this.totalScore += 75;
        this.stepsScore = 75;
      }
      if(steps >= 6000 && steps <= 7999) {
        this.totalScore += 50;
        this.stepsScore = 50;
      }
      if(steps < 6000) {
        this.totalScore += 25;
        this.stepsScore = 25;
      }
    }

    if(this.userData.age! >= 18) {
      if(steps >= 10000) {
        this.totalScore += 100;
        this.stepsScore = 100;
      }
      if(steps >= 8000 && steps <= 9999) {
        this.totalScore += 75;
        this.stepsScore = 75;
      }
      if(steps >= 5000 && steps <= 7999) {
        this.totalScore += 50;
        this.stepsScore = 50;
      }
      if(steps < 5000) {
        this.totalScore += 25;
        this.stepsScore = 25;
      }
    }
  }


  analyzeSleep(sleepTime: number) {
    if(this.userData.age! >= 6 && this.userData.age! <= 12) {
      if(sleepTime >= 540 && sleepTime <= 720) {
      this.totalScore += 100;
      this.sleepScore = 100;
    }

    if(sleepTime >= 420 && sleepTime <= 539) {
      this.totalScore += 75;
      this.sleepScore = 75;
    }

    if(sleepTime >= 360 && sleepTime <= 419) {
      this.totalScore += 50;
      this.sleepScore = 50;
    }

    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
    }
    }

    if(this.userData.age! >= 13 && this.userData.age! <= 18) {
      if(sleepTime >= 480 && sleepTime <= 600)  {
      this.totalScore += 100;
      this.sleepScore = 100;
    }

    if(sleepTime >= 420 && sleepTime <= 479)  {
      this.totalScore += 75;
      this.sleepScore = 75;
    }

    if(sleepTime >= 360 && sleepTime <= 419) {
      this.totalScore += 50;
      this.sleepScore = 50;
    }

    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
    }
    }


    if(this.userData.age! >= 19) {
      if(sleepTime >= 420 && sleepTime <= 540)  {
      this.totalScore += 100;
      this.sleepScore = 100;
    }

    if(sleepTime >= 390 && sleepTime <= 419)  {
      this.totalScore += 75;
      this.sleepScore = 75;
    }

    if(sleepTime >= 360 && sleepTime <= 389)  {
      this.totalScore += 50;
      this.sleepScore = 50;
    }


    if(sleepTime < 360) {
      this.totalScore += 25;
      this.sleepScore = 25;
    }
    }
  }

  analyzeWater(water: number) {
    console.log(water);
    if(this.userData.age! >= 4 && this.userData.age! <= 8) {
      if(water >= 1.2) {
        this.waterScore = 100;
        this.totalScore += 100;
      }
      if(water >= 1 && water <= 1.199) {
        this.waterScore = 75;
        this.totalScore += 75;
      }
      if(water >= 0.9 && water <= 0.99) {
        this.waterScore = 50;
        this.totalScore += 50;
      }
      if(water < 0.9) {
        this.waterScore = 25;
        this.totalScore += 25;
      }
    }

    if(this.userData.age! >= 9 && this.userData.age! <= 13) {
      if(water >= 1.9) {
        this.waterScore = 100;
        this.totalScore += 100;
      }
      if(water >= 1.65 && water <= 1.89) {
        this.waterScore = 75;
        this.totalScore += 75;
      }
      if(water >= 1.4 && water <= 1.64) {
        this.waterScore = 50;
        this.totalScore += 50;
      }
      if(water < 1.4) {
        this.waterScore = 25;
        this.totalScore += 25;
      }
    }

    if(this.userData.age! >= 14 && this.userData.age! <= 18) {
      if(water >= 2.6) {
        this.waterScore = 100;
        this.totalScore += 100;
      }
      if(water >= 1.9 && water <= 2.59) {
        this.waterScore = 75;
        this.totalScore += 75;
      }
      if(water >= 1.6 && water <= 1.89) {
        this.waterScore = 50;
        this.totalScore += 50;
      }
      if(water < 1.6) {
        this.waterScore = 25;
        this.totalScore += 25;
      }
    }

    if(this.userData.age! >= 19 && this.userData.gender == 'men') {
      if(water >= 3) {
        this.waterScore = 100;
        this.totalScore += 100;
      }
      if(water >= 2.6 && water <= 2.99) {
        this.waterScore = 75;
        this.totalScore += 75;
      }
      if(water >= 2 && water <= 2.6) {
        this.waterScore = 50;
        this.totalScore += 50;
      }
      if(water < 2) {
        this.waterScore = 25;
        this.totalScore += 25;
      }
    }

    if(this.userData.age! >= 19 && this.userData.gender == 'woman') {
      if(water >= 2.1) {
        this.waterScore = 100;
        this.totalScore += 100;
      }
      if(water >= 1.9 && water <= 2.199) {
        this.waterScore = 75;
        this.totalScore += 75;
      }
      if(water >= 1.6 && water <= 1.89) {
        this.waterScore = 50;
        this.totalScore += 50;
      }
      if(water < 1.6) {
        this.waterScore = 25;
        this.totalScore += 25;
      }
    }
    console.log(this.waterScore);
  }

  analyzeCalories(calories: number) {   // depends on user's calories goal
    const result = (calories/this.goalsData.caloriesGoal) * 100;
    if(result < 50) {
      this.caloriesScore = 25;
      this.totalScore += 25;
    }
    if(result >= 50 && result < 75) {
      this.caloriesScore = 50;
      this.totalScore += 50;
    }
    if(result >= 75 && result < 100) {
      this.caloriesScore = 75;
      this.totalScore += 75;
    }
    if(result == 100) {
      this.caloriesScore = 100;
      this.totalScore += 100;
    }
  }

  analyzeOverallScore() {
    //calculation of max possible score
    if(this.configData.calories == true)
      this.totalScore += 100;
    if(this.configData.sleepTime == true)
      this.totalScore += 100;
    if(this.configData.steps == true)
      this.totalScore += 100;
    if(this.configData.water == true)
      this.totalScore += 100;
    ///////////////////////////////////////////
    this.overallScore = Math.floor((this.scoresData.totalScore! / this.totalScore) * 100);
    this.scoresData.overallScore = this.overallScore;
  }

}
