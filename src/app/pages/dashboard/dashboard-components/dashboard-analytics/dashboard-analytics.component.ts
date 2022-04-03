import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../@core/services/user.service';
import {UserModel} from '../../../../@core/models/user.model';
import {SegmentCustomEvent} from '@ionic/angular';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  providers: [UserService]
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  user: UserModel;

  segment = '';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,

      },
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {} as ChartData<'bar'>;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = new UserModel();
    this.loadUser();
  }

  loadUser(): void {
    this.userService.findUser().subscribe((data) => {
      this.user = data;
    });
  }

  getBarChartByMonth(user: UserModel) {
    return this.barChartData = {
      labels: [
        ...this.userService.getFollowUpByMonths(user, 'monthly').map((data) => `${data.monthName}/${data.year}`)
      ],
      datasets: [{
        backgroundColor: '#53a3e7',
        data: [...this.userService.getFollowUpByMonths(user, 'monthly').map((data) => data.milliliters)],
        label: 'Meses'
      }]
    };
  }

  getBarChartByYear(user: UserModel) {
    return this.barChartData = {
      labels: [
        ...this.userService.getFollowUpByMonths(user, 'yearly').map((data) => `${data.year}`)
      ],
      datasets: [{
        backgroundColor: '#53a3e7',
        data: [...this.userService.getFollowUpByMonths(user, 'yearly').map((data) => data.milliliters)],
        label: 'Anos'
      }]
    };
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.user.dailyMillilitersModels.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  selectSegment(event: SegmentCustomEvent): void {
    this.segment = event.detail.value;
  }

  ngAfterViewInit(): void {
    this.segment =  'monthly';
  }

  public chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }
}
