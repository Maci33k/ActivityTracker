import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSharedService } from 'src/app/shared/user-shared.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;
  private routerEventsSubscription!: Subscription;
   email: string = '';
   password: string = '';
   response: any;

  constructor(private router: Router,
     private userService: UserServiceService,
     private snackBar: MatSnackBar,
     private userData: UserSharedService
    ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/login') {
        this.playVideo();
      }
    });
  }

  ngAfterViewInit() {
    this.playVideo();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  playVideo() {
    const video = this.videoElement.nativeElement;
    video.currentTime = 0;
    video.muted = true;
    video.play().catch(error => {
      console.error('Failed to play the video:', error);
      const playOnInteraction = () => {
        video.play().catch(err => {
          console.error('Retry failed:', err);
        });
        document.removeEventListener('click', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction);
    });
  }

  LogIn() {
    this.verifyUser();
  }

  verifyUser() {
    this.userService.checkUser(this.email, this.password).subscribe({
      next: (data) => {
        this.response = data;
        if(this.response == true) {
          console.log(this.email);
          this.setUserId();
          this.setEmail();
          this.router.navigate(['/app/your-day']);
        }
      },
      error: (err) => {
        this.response = err.error;
        this.snackBar.open('Niepoprawne dane logowania', 'Zamknij', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }

  setUserId(): void {
    this.userService.getUserId(this.email).subscribe({
      next: (data: any) => {
        this.userData.userID = data;
        this.setUsername();
        this.getFullUser();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  setEmail(): void {
    this.userData.email = this.email;
  }

  setUsername(): void {
    this.userService.gerUsername(this.userData.userID!).subscribe({
      next: (res) => {
        this.userData.username = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getFullUser(): void {
    this.userService.getFullUserData(this.userData.userID!).subscribe({
      next: (user) => {
        this.userData.name = user.name;
        this.userData.surname = user.surname;
        this.userData.age = user.age;
        this.userData.gender = user.gender;
        this.userData.city = user.city;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
