import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  @ViewChild('videoBackground') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.videoElement.nativeElement.play().catch(error => {
      console.error('Failed to play the video:', error);
    });
  }

}
