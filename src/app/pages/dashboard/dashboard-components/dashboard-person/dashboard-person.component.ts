import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../@core/models/user.model';
import {UserService} from '../../../../@core/services/user.service';

@Component({
  selector: 'app-dashboard-person',
  templateUrl: './dashboard-person.component.html',
  styleUrls: ['./dashboard-person.component.scss'],
  providers: [UserService]
})
export class DashboardPersonComponent implements OnInit {

  user: UserModel;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.findUser().subscribe((data) => {
      this.user = data;
    });
  }
}
