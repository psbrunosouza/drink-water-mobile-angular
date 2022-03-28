import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardAnalyticsComponent} from './dashboard-analytics/dashboard-analytics.component';
import {DashboardDrinkReminderComponent} from './dashboard-drink-reminder/dashboard-drink-reminder.component';
import {DashboardPersonComponent} from './dashboard-person/dashboard-person.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardPersonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardPersonComponent
  ]
})
export class DashboardComponentsModule { }
