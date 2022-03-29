import {DefaultModel} from './default.model';
import {DailyDrinksModel} from './dailyDrinksModel';

export class PersonModel extends DefaultModel {
  public height: number;
  public weight: number;
  public age: number;
  public dailyDrinks: DailyDrinksModel[];
}
