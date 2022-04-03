import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {UserModel} from '../models/user.model';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ptBR } from 'date-fns/locale';
import {format, parseISO} from 'date-fns';

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

  getFollowUpByMonths(user: UserModel): {month: number; monthName: string; milliliters: number; millilitersTotal: number}[] {
     let months: {month: number; monthName: string; milliliters: number; millilitersTotal: number}[] = [];
    let totalOfMilliliters = 0;

     user?.dailyMillilitersModels?.forEach((dailyMilliliter) => {

       totalOfMilliliters += this.calculateTotalOfMillilitersToDrink(user);

       dailyMilliliter.drinks.forEach((drink) => {
         const parsedDate = parseISO(dailyMilliliter.date as string);
         const monthAlreadyRegistered = months.findIndex(month => month.month === parsedDate.getMonth());
         if(monthAlreadyRegistered === -1){
           months = [
             ...months,
             {
               month: parsedDate.getMonth(),
               milliliters: drink.milliliters,
               millilitersTotal: totalOfMilliliters,
               monthName: format(parsedDate, 'LLLL', { locale: ptBR })
             }
           ];
         }else {
           months[monthAlreadyRegistered].milliliters += drink.milliliters;
         }
       });

     });

     return months;
  }
}
