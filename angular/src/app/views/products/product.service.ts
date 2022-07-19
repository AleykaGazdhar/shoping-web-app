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

  public getProductsList(param?: object): Observable<any> {
    return this.apiService.post(`${this.products}/getProductsList`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteProduct(param: object): Observable<any> {
    return this.apiService.post(`${this.products}/deleteProduct`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public searchProductData(param: object): Observable<any> {
    return this.apiService.post(`${this.products}/searchProductData`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public razorPayCreateOrder(param: object): Observable<any> {
    return this.apiService.post(`${this.products}/razorPayCreateOrder`, param).pipe(
      map((data:any) => {
        return data
      })
    )
  }

  public razorPayOrdayPayment(param: object): Observable<any> {
    return this.apiService.post(`${this.products}/razorPayOrdayPayment`, param).pipe(
      map((data:any) => {
        return data;
      })
    )
  }
  public getOrderList(param: object): Observable<any> {
    return this.apiService.post(`${this.products}/getOrderList`, param).pipe(
      map((data:any) => {
        return data;
      })
    )
  }



}
