import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-bookings-by-custommer-in-month',
  templateUrl: './bookings-by-custommer-in-month.component.html',
  styleUrls: ['./bookings-by-custommer-in-month.component.css']
})
export class BookingsByCustommerInMonthComponent {
  infoCustommer: any[] = [];
  month: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getBookingsByCustommer();
  }

  getBookingsByCustommer(){
    this.http.get(`${environment.apiUrl}stats/bookings-by-customer-in-month/${this.month}`)
      .subscribe((resData:any) => {
        this.infoCustommer = resData;
        console.log(this.infoCustommer)
      });
  }
  getTrangThaiColor(trangThai: string): string {
    if (trangThai === 'Đã đặt') {
      return 'blue'; // Màu xanh cho trạng thái 'Đã đặt'
    } else if (trangThai === 'Đã thanh toán') {
      return 'green'; // Màu xanh lá cây cho trạng thái 'Đã xác nhận'
    } else if (trangThai === 'Đã huỷ') {
      return 'red'; // Màu xanh lá cây cho trạng thái 'Đã xác nhận'
    } else {
      return 'black'; // Màu mặc định cho các trạng thái khác
    }
  }
}
