import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../@core/models/user.model';
import {UserService} from '../../@core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  providers: [UserService]
})
export class SetupPage implements OnInit {

  user: UserModel;

  constructor(private userService: UserService, private route: Router) {
  }

  ngOnInit() {
    this.user = new UserModel();
    this.loadUser();
  }

  loadUser(): void {
    this.userService.findUser().subscribe((data) => {
      this.user = data ?? {};
      if(this.user.id){
        this.route.navigate(['/dashboard/dashboard-components/drink-reminder']);
      }
    });
  }
}
