import { environment } from "../../../../environments/environment";

export class signupUser {
  fullName: string = '';
  lastName: string = '';
  email: string = '';
  contact: string = '';
  password: string = '';
  repeat: string = '';
  gender: string = 'male';
  status: number = 1;
  role: string = environment.role.userRole;
}
