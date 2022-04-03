import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../@core/models/user.model';
import {UserService} from '../../../../@core/services/user.service';
import {DailyMillilitersModel} from '../../../../@core/models/daily-milliliters.model';
import {UuidService} from '../../../../@core/providers/uuid.service';
import {format} from 'date-fns';
import {DrinkModel} from '../../../../@core/models/drink.model';

@Component({
  selector: 'app-dashboard-drink-reminder',
  templateUrl: './dashboard-drink-reminder.component.html',
  styleUrls: ['./dashboard-drink-reminder.component.scss'],
  providers: [UserService ]
})
export class DashboardDrinkReminderComponent implements OnInit {
  user: UserModel;

  dailyMilliliters: DailyMillilitersModel;

  drink: DrinkModel;

  constructor(public userService: UserService, private uuidService: UuidService) { }

  ngOnInit() {
    this.user = new UserModel();
    this.dailyMilliliters = new DailyMillilitersModel();
    this.drink = new DrinkModel();

    this.loadUser();
  }

  addDrink(milliliter: number): void {
    const alreadyExists = this.user.dailyMillilitersModels.find((dailyDrink) => dailyDrink.date === format(new Date(), 'yyyy-MM-dd'));

    if(!alreadyExists){
      this.dailyMilliliters = {
        id: this.uuidService.generateUUID(),
        date: format(new Date(), 'yyyy-MM-dd'),
        drinks: []
      };

      this.drink = {
        id: this.uuidService.generateUUID(),
        milliliters: milliliter
      };

      this.dailyMilliliters.drinks.push(this.drink);

      this.user = {
        ...this.user,
        dailyMillilitersModels: []
      };

      this.user.dailyMillilitersModels.push(this.dailyMilliliters);
    }else {
      this.dailyMilliliters = {
        id: alreadyExists.id,
        date: alreadyExists.date,
        drinks: alreadyExists.drinks
      };

      this.drink = {
        id: this.uuidService.generateUUID(),
        milliliters: milliliter
      };

      this.dailyMilliliters.drinks.push(this.drink);

      this.user.dailyMillilitersModels[this.user.dailyMillilitersModels.findIndex((daily) => daily.id === alreadyExists.id)] =  this.dailyMilliliters;
    }

    this.userService.saveUser(this.user);
  }

  loadUser(): void {
    this.userService.findUser().subscribe((data) => {
      this.user = data;
    });
  }
}
