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

  constructor(private personService: PersonService, private storageService: StorageService, public toastController: ToastController) { }

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

  loadRemainingDrinks(): number {
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
    const dailyDrinkAlreadyTaken = this.person.dailyDrinks.find((dailyDrink) =>
      format(dailyDrink.date, 'yyyy/MM/dd') === format(new Date(), 'yyyy/MM/dd'));

    this.drink = {
      id: uuidv4(),
      milliliters,
    };

    if(!dailyDrinkAlreadyTaken && !this.person.dailyDrinks.length){
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

  calculateTotalOfMillilitersToDrink(): number {
    return this.person.weight * this.calculateBaseMilliliters();
  }

  async addDrinkToast(milliliters: number) {
    const toast = await this.toastController.create({
      message: `Parabéns, você acabou de beber: ${milliliters} ml(s) de água!`,
      duration: 2000
    });
    await toast.present();
  }

  private calculateBaseMilliliters(): number {
    if(!!this.person.age) {
      if(this.person.age <= 30){
        return 40;
      }else if(this.person.age > 30 && this.person.age <= 55){
        return 35;
      }else {
        return 30;
      }
    }else {
      return 35;
    }
  }
}
