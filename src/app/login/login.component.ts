import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';


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
export class LoginComponent {

  constructor(private router: Router){}

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.videoElement.nativeElement.play().catch(error => {
      console.error('Failed to play the video:', error);
    });
  }

  LogIn() {
    this.router.navigate(['/app']);
  }

}
