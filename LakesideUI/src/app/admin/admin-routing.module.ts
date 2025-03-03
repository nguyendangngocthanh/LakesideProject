import { NewsComponent } from './news/news.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { RoomComponent } from './room/room.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { BookingComponent } from './booking/booking.component';
import { LowDemandRoomComponent } from './stats/low-demand-room/low-demand-room.component';
import { RevenueInRangeComponent } from './stats/revenue-in-range/revenue-in-range.component';
import { RevenueInMonthComponent } from './stats/revenue-in-month/revenue-in-month.component';
import { LowDemandRoomMonthComponent } from './stats/low-demand-room-month/low-demand-room-month.component';
import { BookedComponent } from './booking/booked/booked.component';
import { CanceledComponent } from './booking/canceled/canceled.component';
import { PaidComponent } from './booking/paid/paid.component';
import { RefusedComponent } from './booking/refused/refused.component';
import { AvailableRoomsComponent } from './room/available-rooms/available-rooms.component';
import { AvailableByTypeComponent } from './room/available-by-type/available-by-type.component';
import { TypeRoomComponent } from './type-room/type-room.component';
import { BookingsByCustommerInMonthComponent } from './stats/bookings-by-custommer-in-month/bookings-by-custommer-in-month.component';
import { InfoByCustommerDayComponent } from './stats/info-by-custommer-day/info-by-custommer-day.component';
import { BookingsByRoomInMonthComponent} from './stats/bookings-by-room-in-month/bookings-by-room-in-month.component';
import { MenthodsComponent } from './menthods/menthods.component'
import { FeedbackComponent } from './feedback/feedback.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'',
        component: StatsComponent
      },
      {
        path:'room',
        component: RoomComponent
      },
      {
        path:'type-room',
        component: TypeRoomComponent
      },
      {
        path:'receipt',
        component: ReceiptComponent
      },
      {
        path:'booking',
        component: BookingComponent
      },
      {
        path:'news',
        component: NewsComponent
      },
      {
        path:'methods',
        component: MenthodsComponent
      },
      {
        path:'feedback',
        component: FeedbackComponent
      },
      {
        path:'stats/revenue-in-range',
        component: RevenueInRangeComponent
      },
      {
        path:'stats/revenue-in-month',
        component: RevenueInMonthComponent
      },
      {
        path:'stats/low-demand-room',
        component: LowDemandRoomComponent
      },
      {
        path:'stats/low-demand-room-month',
        component: LowDemandRoomMonthComponent
      },
      {
        path:'stats/bookings-by-room-in-month',
        component: BookingsByRoomInMonthComponent
      },
      {
        path:'stats/booking-by-custommer',
        component: BookingsByCustommerInMonthComponent
      },
      {
        path:'stats/info-by-day',
        component: InfoByCustommerDayComponent
      },
      {
        path:'booking/booked',
        component:BookedComponent
      },
      {
        path:'booking/canceled',
        component:CanceledComponent
      },
      {
        path:'booking/paid',
        component:PaidComponent
      },
      {
        path:'booking/refused',
        component:RefusedComponent
      },
      {
        path:'room/available-rooms',
        component: AvailableRoomsComponent
      },
      {
        path:'room/available-by-type',
        component: AvailableByTypeComponent
      }
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
