import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { ApiService } from "../../shared-ui/services/api.service";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseurl: string = environment.baseUrl;
  products = "products";
  constructor(
    private apiService: ApiService
  ) { }
  public addProduct(param: object): any {
    return this.apiService.post(`${this.products}/addProduct`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getProductsList(): Observable<any> {
    return this.apiService.get(`${this.products}/getProductsList`).pipe(
      map((data) => {
        return data;
      })
    );
  }



}
