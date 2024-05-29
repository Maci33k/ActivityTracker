export class UserModel {
  userID: number = 0;
  username: string = '';
  email: string = '';
  password: string = '';
  isVerified: boolean = false;
  verificationToken: string = 'default';
  activityData: any[] = [];
  training: any[] = [];
}
