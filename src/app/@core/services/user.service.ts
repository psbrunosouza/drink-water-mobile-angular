import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {UserModel} from '../models/user.model';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ptBR } from 'date-fns/locale';
import {format, parseISO} from 'date-fns';

interface IMonth {
  month: number;
  year: number;
  monthName: string;
  milliliters: number;
  millilitersTotal: number;
}

interface IYear {
  year: number;
  milliliters: number;
  millilitersTotal: number;
}

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

  getFollowUpByMonths(user: UserModel, period: 'yearly' | 'monthly' = 'monthly'): IMonth[] | IYear[] {
     const months: IMonth[] = [];
     const years: IYear[] = [];

     user?.dailyMillilitersModels?.forEach((dailyMilliliter) => {
       const parsedDateDaily = parseISO(dailyMilliliter.date as string);
       const monthAlreadyRegisteredDaily = months.findIndex(month => month.month === parsedDateDaily.getMonth());

       if(monthAlreadyRegisteredDaily === -1){
         months.push({
           month: parsedDateDaily.getMonth(),
           year: parsedDateDaily.getFullYear(),
           monthName: format(parsedDateDaily, 'LLLL', { locale: ptBR }),
           millilitersTotal: this.calculateTotalOfMillilitersToDrink(user),
           milliliters: 0
         });
       }else {
         months[monthAlreadyRegisteredDaily].millilitersTotal += this.calculateTotalOfMillilitersToDrink(user);
       }

       dailyMilliliter.drinks.forEach((drink) => {
         const monthAlreadyRegistered = months.findIndex(month => month.month === parsedDateDaily.getMonth());
         if(monthAlreadyRegistered !== -1){
           months[monthAlreadyRegistered].milliliters += drink.milliliters;
         }
       });
     });

     months.forEach((data) => {
       const yearAlreadyRegistered = years.findIndex((year) => year.year === data.year);

       if(yearAlreadyRegistered === -1){
         years.push({
           year: data.year,
           millilitersTotal: data.millilitersTotal,
           milliliters: data.milliliters
         });
       }else {
         years[yearAlreadyRegistered].milliliters +=  data.milliliters;
         years[yearAlreadyRegistered].millilitersTotal +=  data.millilitersTotal;
       }
     });

     switch (period){
       case 'monthly':
         return months;
       case 'yearly':
         return years;
     }
  }
}
