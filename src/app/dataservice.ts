import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderFilterModel } from './models/filtermodels/OrderFilterModel';
import { OrderStatusUpdateRequestModel } from './models/OrderStatusUpdateRequestModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7066/api/'; // API adresi

  constructor(private http: HttpClient) { }

  getOrders(filtermodel:OrderFilterModel): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(filtermodel);
    console.log(body);
    return this.http.post(this.apiUrl + 'Order/ListOrders', body,{'headers':headers})

  }
    updateOrderStatus(request: OrderStatusUpdateRequestModel): Observable<any> {
      const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(request);
      console.log(body);
    return this.http.put(this.apiUrl + 'Order/UpdateOrderStatus', body,{'headers':headers});
  }
  getOrderStatuses(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.apiUrl + 'Order/ListOrderStatuses')

  }
}