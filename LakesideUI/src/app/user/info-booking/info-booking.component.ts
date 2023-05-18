import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-info-booking',
  templateUrl: './info-booking.component.html',
  styleUrls: ['./info-booking.component.css'],
})
export class InfoBookingComponent implements OnInit {
  searchResult: any;

  formBooking = {
    tenKhachHang: '',
    soDienThoai: '',
    email: '',
    soDinhDanh: '',
    ngayNhan: '',
    ngayTra: '',
    maPhong: 0,
  };

  checkIn: string = '';
  checkOut: string = '';

  days: number = 0;

  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.searchResult = JSON.parse(
      this.route.snapshot.paramMap.get('searchResult') || '{}'
    );
    this.days = parseInt(this.route.snapshot.paramMap.get('days') || '0', 10);
    this.checkIn = this.route.snapshot.paramMap.get('checkIn') || '';
    this.checkOut = this.route.snapshot.paramMap.get('checkOut') || '';
    this.totalPrice = this.searchResult.giaPhong * this.days;

    this.formBooking.maPhong = this.searchResult.maPhong;
    this.formBooking.ngayNhan = this.checkIn;
    this.formBooking.ngayTra = this.checkOut;
    console.log(this.searchResult);
  }

  // postData(){
  //   this.formBooking.ngayNhan = this.checkIn;
  //   this.formBooking.ngayTra = this.checkOut;
  //   this.formBooking.maPhong = this.searchResult.maPhong;
  //   console.log(this.formBooking);
  // }

  postData() {
    this.formBooking.ngayNhan = this.checkIn;
    this.formBooking.ngayTra = this.checkOut;
    this.formBooking.maPhong = this.searchResult.maPhong;
    if (
      !this.formBooking.tenKhachHang ||
      !this.formBooking.soDienThoai ||
      !this.formBooking.email ||
      !this.formBooking.soDinhDanh
    ) {
      // Kiểm tra xem các trường bắt buộc đã được nhập hay chưa
      alert('Vui lòng điền đầy đủ thông tin.'); // Hoặc hiển thị thông báo lỗi khác
      return;
    }
    this.http
      .post(`${environment.apiUrl}reservations/create`, this.formBooking)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
