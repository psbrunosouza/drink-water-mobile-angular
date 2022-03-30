import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../../../@core/models/person.model';
import {PersonService} from '../../../../@core/services/database/person.service';
import {StorageService} from '../../../../@core/services/database/storage.service';
import {DailyDrinksModel} from '../../../../@core/models/dailyDrinksModel';
import { v4 as uuidv4 } from 'uuid';
import {DrinkModel} from '../../../../@core/models/drink.model';
import {format} from 'date-fns';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-dashboard-drink-reminder',
  templateUrl: './dashboard-drink-reminder.component.html',
  styleUrls: ['./dashboard-drink-reminder.component.scss'],
  providers: [PersonService]
})
export class DashboardDrinkReminderComponent implements OnInit {

  person: PersonModel;

  dailyDrink: DailyDrinksModel;

  drink: DrinkModel;

  constructor(public personService: PersonService, private storageService: StorageService, public toastController: ToastController) { }

  ngOnInit() {
    this.person = new PersonModel();
    this.dailyDrink = new DailyDrinksModel();
    this.drink = new DrinkModel();
    this.loadPerson();
  }

  loadPerson(): void {
    this.storageService.init().then(() => {
      this.personService.findPerson().then((person) => {
        this.person = person;
      });
    });
  }

  loadTakenDrinks(): number {
    let remainingDrinks = 0;

    const dailyDrinkAlreadyTaken = this.person?.dailyDrinks?.find((dailyDrink) =>
      format(dailyDrink.date, 'yyyy/MM/dd') === format(new Date(), 'yyyy/MM/dd'));

    if(!dailyDrinkAlreadyTaken){
      return remainingDrinks;
    }

    dailyDrinkAlreadyTaken.drinks.forEach((drink) => {
      remainingDrinks += drink.milliliters;
    });

    return remainingDrinks;
  }

  addDrink(milliliters: number): void{
    const dailyDrinkAlreadyTaken = this.person?.dailyDrinks?.find((dailyDrink) =>
      format(dailyDrink.date, 'yyyy/MM/dd') === format(new Date(), 'yyyy/MM/dd'));

    this.drink = {
      id: uuidv4(),
      milliliters,
    };

    console.log(dailyDrinkAlreadyTaken, this.person.dailyDrinks);

    if(!dailyDrinkAlreadyTaken){
      this.dailyDrink = {
        id: uuidv4(),
        date: new Date(),
        drinks: []
      } as DailyDrinksModel;

      this.dailyDrink.drinks.push(this.drink);
    }else {
      this.dailyDrink = {
        id: dailyDrinkAlreadyTaken.id,
        date: dailyDrinkAlreadyTaken.date,
        drinks: dailyDrinkAlreadyTaken.drinks
      } as DailyDrinksModel;

      this.dailyDrink.drinks.push(this.drink);
    }

    this.person.dailyDrinks.push(this.dailyDrink);

    this.personService.updatePerson(this.person).then(() => {
      this.addDrinkToast(milliliters);
    });
  }


  getPercentageValueOfTakenDrinks(): number {
    return (this.loadTakenDrinks() * 100) / this.personService.calculateTotalOfMillilitersToDrink(this.person) > 100
      ? 100
      : (this.loadTakenDrinks() * 100) / this.personService.calculateTotalOfMillilitersToDrink(this.person);
  };

  async addDrinkToast(milliliters: number) {
    const toast = await this.toastController.create({
      message: `Parabéns, você acabou de beber: ${milliliters} ml(s) de água!`,
      duration: 2000
    });
    await toast.present();
  }
}
