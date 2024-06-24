import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from 'src/app/animations';
import { expandAnimation } from 'src/app/animations';
import { FormsModule } from '@angular/forms';
import { fadeSlideAnimation } from 'src/app/animations';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivityModel } from 'src/app/models/activity.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule,
    FormsModule
  ],
  animations: [slideInAnimation, expandAnimation, fadeSlideAnimation],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss'
})
export class JournalComponent {

  constructor(private userData: UserSharedService,
              private activityService: ActivityService
  ) {}

  draggedIcon: any;
  draggedIndex: number | null = null;
  numberOfCustomFields = 0;
  expanded = false;

  // Variables of activity data prepared to send to the database
  steps: number | null = null;
  callories: number | null = null;
  water: number | null = null; // liters
  sleepTime: number | null = null; // in minutes
  sleepTimeRange = {
    startTime: null as string | null,
    endTime: null as string | null
  }

  icons = [
    { name: 'Kroki', class: 'fa-solid fa-shoe-prints', state: 'active' },
    { name: 'Kalorie', class: 'fa-solid fa-fire', state: 'active' },
    { name: 'Woda', class: 'fa-solid fa-droplet', state: 'active' },
    { name: 'Trening', class: 'fa-solid fa-person-running', state: 'active' },
    { name: 'Sen', class: 'fa-solid fa-moon', state: 'active' }
  ]

  onDragStart(event: DragEvent, icon: any, index: number) {
    this.draggedIcon = icon;
    this.draggedIndex = index;
    event.dataTransfer?.setData('application/json', JSON.stringify(icon));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Zapobiega domyślnemu zachowaniu przeglądarki, umożliwiając operację drop
    const element = event.target as HTMLElement; // Konwertuje cel zdarzenia na element HTML
    element.classList.add('drag-over'); // Dodaje klasę CSS 'drag-over' do elementu
  }

  onDrop(event: DragEvent) {
    event.preventDefault(); // Zapobiega domyślnemu zachowaniu przeglądarki
    const data = event.dataTransfer?.getData('application/json');
    const icon = data ? JSON.parse(data) : null; // Parsuje dane JSON
    const element = event.target as HTMLElement; // Konwertuje cel zdarzenia na element HTML
    element.classList.remove('drag-over'); // Usuwa klasę CSS 'drag-over' z elementu

    if (element !== event.currentTarget) {

      event.stopPropagation();
      return;
    }

    if (icon && this.numberOfCustomFields < 5) {
      const newElement = document.createElement('i');
      newElement.className = icon.class;
      if(this.numberOfCustomFields == 0) {
        newElement.style.color = 'white';
        newElement.style.fontSize = '300%';
      }
      else if(this.numberOfCustomFields != 0) {
      newElement.style.color = 'white';
      newElement.style.fontSize = '300%';
      newElement.style.marginLeft = '10%';
      }
      element.appendChild(newElement);
    }
    if (this.draggedIndex !== null) {
      this.icons.splice(this.draggedIndex, 1);
      this.draggedIndex = null; // Resetuje indeks przeciąganej ikony
      this.numberOfCustomFields++;
      console.log(this.numberOfCustomFields);
    }
  }

  onDragLeave(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('drag-over');
  }

  toggleState() {
    this.expanded = !this.expanded; // zmiana stanu po kliknięciu
  }

  // logic for data traffic between html and typescript variables
  getModel(iconName: string): any {
    switch (iconName) {
      case 'Kroki':
        return this.steps;
      case 'Kalorie':
        return this.callories;
      case 'Woda':
        return this.water;
      case 'Sen':
        return this.sleepTime;
      default:
        return '';
    }
  }

  setModel(iconName: string, value: any): void {
    switch (iconName) {
      case 'Kroki':
        this.steps = value;
        break;
      case 'Kalorie':
        this.callories = value;
        break;
      case 'Woda':
        this.water = value;
        break;
      case 'Sleep':
        this.sleepTime = value;
      break;
    }
  }

  submit(item: any) {
    console.log(this.steps);
    console.log(this.userData.userID);
    this.removeItem(item);
    this.createActivity();
  }

  removeItem(item: any) {
    item.state = 'inactive';
    setTimeout(() => {
      this.icons = this.icons.filter(i => i !== item);
    }, 500); // Czas animacji w milisekundach
  }

  submitTime(item: any) {
    if(this.sleepTimeRange.startTime && this.sleepTimeRange.endTime) {
    console.log(this.sleepTimeRange.startTime);
    console.log(this.sleepTimeRange.endTime);
    this.calculateSleepTime();
    this.createActivity();
    this.removeItem(item);
    }
  }

  createActivity() {
    this.activityService.checkIfRecordExists().subscribe({
      next: (success) => {
        console.log(success);
        if(success == false) {
        const activityData: ActivityModel =
    {
      id: 0,
      date: new Date(),
      userID: this.userData.userID,
      steps: this.steps,
      calories: this.callories,
      water: this.water,
      sleepTime: this.sleepTime
    }
    this.activityService.createRecord(activityData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  else {
    this.modifyActivity();
  }
      },
      error: (err) => {
        console.log("Error while checking existing of first record of the day", err);
      }
    })
  }

  modifyActivity() {
    this.activityService.getTodaysRecordID().subscribe({
      next: (id) => {
        const activityData: ActivityModel =
    {
      id: id,
      date: new Date(),
      userID: this.userData.userID,
      steps: this.steps,
      calories: this.callories,
      water: this.water,
      sleepTime: this.sleepTime
    }
    console.log(activityData);
    this.activityService.updateRecord(activityData.id, activityData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  calculateSleepTime() {
    if (this.sleepTimeRange.startTime && this.sleepTimeRange.endTime) {
      // Pobierz datę dzisiejszą jako punkt odniesienia dla obu godzin
      const today = new Date();

      // Pobierz godziny i minuty z inputów
      const startTimeParts = this.sleepTimeRange.startTime.split(':').map(part => parseInt(part, 10));
      const endTimeParts = this.sleepTimeRange.endTime.split(':').map(part => parseInt(part, 10));

      // Ustaw daty dla obu godzin na dzisiejszy dzień
      const startDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startTimeParts[0], startTimeParts[1]);
      const endDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endTimeParts[0], endTimeParts[1]);

      // Jeżeli koniec jest wcześniejszy niż początek, dodaj jeden dzień do daty końcowej
      if (endDateTime < startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      // Obliczenie różnicy czasu w minutach
      const diff = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

      // Przypisanie obliczonej różnicy do zmiennej sleepTime
      this.sleepTime = diff;
      console.log('Calculated sleep time:', this.sleepTime);
    } else {
      this.sleepTime = null; // Jeżeli którakolwiek z wartości czasu jest pusta, ustaw czas snu na null
    }
  }


}
