import {DefaultModel} from './default.model';
import {DrinkModel} from './drink.model';

export class DrinkSetModel extends DefaultModel{
  date: Date;
  drinks: DrinkModel[];
}
