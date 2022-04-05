import { Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../@core/models/user.model';
import {UserService} from '../../../@core/services/user.service';
import {Router} from '@angular/router';
import {format, parseISO} from 'date-fns';

@Component({
  selector: 'app-app-components-setup-user-form',
  templateUrl: './app-components-setup-user-form.component.html',
  styleUrls: ['./app-components-setup-user-form.component.scss'],
  providers: [UserService]
})
export class AppComponentsSetupUserFormComponent implements OnInit {
  @Input() user: UserModel;

  constructor(public userService: UserService, private router: Router) {

  }

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

  getTime(event, type: string): void {
    switch (type){
      case 'start':
        this.user.startTime = format(parseISO(event.detail.value), 'HH:mm:ss');
        break;
      case 'end':
        this.user.endTime = format(parseISO(event.detail.value), 'HH:mm:ss') ;
        break;
    }
  }



}
