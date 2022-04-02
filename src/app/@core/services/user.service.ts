import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {UserModel} from '../models/user.model';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {format} from 'date-fns';

@Injectable()
export class UserService {

  userKey = 'user';

  baseMilliliters = 35;

  constructor(private databaseService: DatabaseService) { }

  saveUser(user: UserModel): Observable<any> {
    return from(this.databaseService.setStorage({key: this.userKey, value: JSON.stringify({...user, id: this.userKey})}));
  }

  findUser(): Observable<any> {
    return from(this.databaseService.getStorage({key: this.userKey})).pipe(map(((result) => JSON.parse(result.value))));
  }

  loadTakenDrinks(user: UserModel): number {
    let takenDrinks = 0;

    const alreadyExists = user.dailyMillilitersModels?.find((dailyDrink) => dailyDrink.date === format(new Date(), 'yyyy-MM-dd'));

    if(alreadyExists){
      alreadyExists.drinks.forEach((drink) => {
        takenDrinks += drink.milliliters;
      });
    }

    return takenDrinks;
  }

  calculateTotalOfMillilitersToDrink(user: UserModel): number {
    return this.baseMilliliters * user.weight;
  }

  getPercentageValueOfTakenDrinks(user: UserModel): number {
    return (this.loadTakenDrinks(user) * 100) / this.calculateTotalOfMillilitersToDrink(user) > 100
      ? 100
      : +Math.round((this.loadTakenDrinks(user) * 100) / this.calculateTotalOfMillilitersToDrink(user));
  }
}
