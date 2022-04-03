import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../@core/models/user.model';
import {UserService} from '../../../@core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-components-setup-person-form',
  templateUrl: './app-components-setup-person-form.component.html',
  styleUrls: ['./app-components-setup-person-form.component.scss'],
  providers: [UserService]
})
export class AppComponentsSetupPersonFormComponent implements OnInit {

  @Input() user: UserModel;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  createUser(): void {
    if(this.user.id){
      this.userService.saveUser({...this.user}).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }else {
      this.userService.saveUser({...this.user, dailyMillilitersModels: []}).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
