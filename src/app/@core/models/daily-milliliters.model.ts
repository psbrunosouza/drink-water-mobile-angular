import {DrinkModel} from './drink.model';
import {DefaultModel} from './default.model';

export class DailyMillilitersModel extends DefaultModel {
  date: Date | string;
  drinks: DrinkModel[];
}
