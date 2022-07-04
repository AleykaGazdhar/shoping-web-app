import { environment } from '../../../environments/environment';

export class currentUser {
  _id?: string;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phonenumber: string = '';
  password: string = '';
  confirm_password: string = '';
  gender: string = 'male';
  role: string = environment.role.userRole;
}
