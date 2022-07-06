import { environment } from '../../../environments/environment';

export class currentProduct {
  _id?: string;
  productname: string = '';
  productprice: string = '';
  productmargin: string = '';
  Productdescription: string = '';
  status: number = 1;
  role: string = environment.role.userRole;
}
