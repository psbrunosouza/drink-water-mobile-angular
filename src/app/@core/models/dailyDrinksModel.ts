import {DefaultModel} from './default.model';
import {DrinkModel} from './drink.model';

export class DailyDrinksModel extends DefaultModel{
  date: Date;
  drinks: DrinkModel[];
}
