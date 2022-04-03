import { AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../../../../@core/services/user.service';
import {UserModel} from '../../../../@core/models/user.model';
import {SegmentCustomEvent} from '@ionic/angular';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  providers: [UserService]
})
export class DashboardAnalyticsComponent implements OnInit, AfterViewInit {

  user: UserModel;

  segment = '';

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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
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
}
