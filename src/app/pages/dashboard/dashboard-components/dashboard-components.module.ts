import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardAnalyticsComponent} from './dashboard-analytics/dashboard-analytics.component';
import {DashboardDrinkReminderComponent} from './dashboard-drink-reminder/dashboard-drink-reminder.component';
import {DashboardUserComponent} from './dashboard-person/dashboard-user.component';
import {IonicModule} from '@ionic/angular';
import {AppComponentsModule} from '../../app-components/app-components.module';



@NgModule({
  declarations: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardUserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppComponentsModule
  ],
  exports: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardUserComponent
  ]
})
export class DashboardComponentsModule { }
