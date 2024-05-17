import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;
  private routerEventsSubscription!: Subscription;

  constructor(private router: Router) {}

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
    video.muted = true; // Ensure the video is muted
    video.play().catch(error => {
      console.error('Failed to play the video:', error);
      // Add event listener for user interaction
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
    this.router.navigate(['/app']);
  }

}
