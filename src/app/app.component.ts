import { Component, OnInit } from '@angular/core';
import { DataService } from './dataservice';
import { OrderFilterModel } from './models/filtermodels/OrderFilterModel';
import { OrderStatusModel } from './models/OrderStatusModel';
import { OrderStatusUpdateRequestModel } from './models/OrderStatusUpdateRequestModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataService: DataService) { }
  title = 'MyPersonalWebsiteUI';
  orders: any[] = [];
  filtermodel:OrderFilterModel=new OrderFilterModel(); 
  orderStatuses:OrderStatusModel[]=[];
  selectedOrder: any;
  selectedStatus: any;
  request:OrderStatusUpdateRequestModel =new OrderStatusUpdateRequestModel(); 
  
  ngOnInit() {
    this.getOrderData()
    this.dataService.getOrderStatuses().subscribe((data) => {
    //console.log(data)
    this.orderStatuses = data;
   // console.log( this.orderStatuses )
  });
  
  }
 getOrderData(){
  this.dataService.getOrders(this.filtermodel).subscribe((data) => {
    this.orders = data;
    //console.log(data)
  });
 }

  onStatusChange(selectedStatus: any) {
    //console.log("sss",selectedStatus.target.value);
    this.selectedStatus=selectedStatus.target.value;
  }
    selectOrder(orderId: any) {
      //console.log(`Selected order ID: ${orderId}`);
      this.selectedOrder = this.orders.find((order: any) => order.customerOrderNo === orderId);
    }
    
    updateOrder() {
       //Güncelleme işlemleri burada yapılır
       console.log('Güncellenen sipariş:', this.selectedOrder);
       console.log('Seçilen durum:', this.selectedStatus);
       this.request.statusId=this.selectedStatus;
       this.request.customerOrderNo=this.selectedOrder.customerOrderNo;
       this.dataService.updateOrderStatus(this.request).subscribe((data) => {
       
        console.log(data)
      });;
       
    }
}

