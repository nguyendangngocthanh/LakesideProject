import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-info-by-custommer-day',
  templateUrl: './info-by-custommer-day.component.html',
  styleUrls: ['./info-by-custommer-day.component.css']
})
export class InfoByCustommerDayComponent {
  infoCustommerInDay: any[] = [];
  month: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getBookingsByCustommer();
  }

  getBookingsByCustommer(){
    this.http.get(`${environment.apiUrl}stats/info-by-customer-day/${this.month}`)
      .subscribe((resData:any) => {
        this.infoCustommerInDay = resData;
        console.log(this.infoCustommerInDay)
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
