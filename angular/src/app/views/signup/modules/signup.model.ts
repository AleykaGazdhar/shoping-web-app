import { environment } from "src/environments/environment";

export class signupUser {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  repeat: string = '';
  gender: string = 'male';
  status: number = 1;
  role: string = environment.role.userRole;
}
