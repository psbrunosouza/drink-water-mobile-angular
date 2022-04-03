import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardAnalyticsComponent} from './dashboard-analytics/dashboard-analytics.component';
import {DashboardDrinkReminderComponent} from './dashboard-drink-reminder/dashboard-drink-reminder.component';
import {DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import {IonicModule} from '@ionic/angular';
import {AppComponentsModule} from '../../app-components/app-components.module';
import {FormsModule} from '@angular/forms';
import {NgChartsModule} from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardUserComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppComponentsModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    DashboardAnalyticsComponent,
    DashboardDrinkReminderComponent,
    DashboardUserComponent
  ]
})
export class DashboardComponentsModule { }
