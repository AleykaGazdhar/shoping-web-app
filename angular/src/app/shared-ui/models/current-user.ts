import { environment } from '../../../environments/environment';

export class currentUser {
  _id?: string;
  fullName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirm_password: string = '';
  gender: string = 'male';
  dob: Date = new Date();
  status: number = 1;
  role: string = environment.role.userRole;
}
