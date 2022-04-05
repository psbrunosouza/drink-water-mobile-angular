import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../@core/models/user.model';
import {UserService} from '../../../../@core/services/user.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss'],
  providers: [UserService]
})
export class DashboardSettingsComponent implements OnInit {

  user: UserModel;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = new UserModel();
    this.loadUser();
  }

  loadUser(): void {
    this.userService.findUser().subscribe((data) => {
      this.user = data;
    });
  }
}
