import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {

  @Input() experience: number = 0;
  @Input() maxExperience: number = 350;

  ngOnInit(): void {
    setTimeout(() => {
      this.experience = 220;
    }, 100);
  }

  increaseExperience() {
    if (this.experience < this.maxExperience) {
      this.experience += 3;
    }
  }

}
