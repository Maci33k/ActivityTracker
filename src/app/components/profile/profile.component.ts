import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/animations';
import { UserSharedService } from 'src/app/shared/user-shared.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  animations: [slideInAnimation],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  constructor(private userData: UserSharedService, private userService: UserServiceService){}



  email: string = this.userData.email!;
  username: string = this.userData.username!;
  name: string = this.userData.name!;
  surname: string = this.userData.surname!;
  age: number = this.userData.age!;
  gender: string = this.userData.gender!;
  city: string = this.userData.city!;
  userPhoto: any;

  ngOnInit(): void {
      this.getUserPhoto();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadFile(file, this.userData.userID!);
    }
  }

 getUserPhoto() {
    this.userService.getUserPhoto(this.userData.userID!)
      .subscribe((data: Blob) => {
        const reader = new FileReader();
     reader.onloadend = () => {
          this.userPhoto = reader.result;
         this.getUserPhoto();
       }
        reader.readAsDataURL(data);
     }, error => {
        console.error('Error fetching user photo:', error);
      });
  }
}
