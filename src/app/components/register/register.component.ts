import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from 'src/app/validators/match-password';
import { UserModel } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;
  private routerEventsSubscription!: Subscription;
  isSubmitted = false;
  registeredUserId = 0;

  user: UserModel =
  {
   userID: 0,
   username: '',
   email: '',
   password: '',
   isVerified:  false,
   verificationToken: 'default',
   activityData: [],
   training: []
 }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  }, { validators: passwordMatchValidator });


  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserServiceService ) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/register') {
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

  onSubmit() {
    //console.log('submitted form', this.registerForm.value, this.registerForm.invalid);
    console.log(this.user.email);
    this.registerUser();
  }

  registerUser() {
    this.userService.postUser(this.user).subscribe({
      next: response => {
        this.registeredUserId = response.userID;
        console.log('Response from server:', response);
        console.log("Przechwycone id: " + this.registeredUserId);
        this.sendEmail();
      },
      error: error => {
        console.error('Error:', error);
      }
    });
  }

  sendEmail() {
    this.userService.sendEmail(this.registeredUserId, this.user.email).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });
  }


}

