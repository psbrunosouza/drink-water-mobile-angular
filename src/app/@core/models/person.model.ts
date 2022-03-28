import {DefaultModel} from './default.model';
import {DrinkSetModel} from './drink-set.model';

export class PersonModel extends DefaultModel {
  height: number;
  weight: number;
  totalOfMillilitersToDrink: number;
  drinkSet: DrinkSetModel[];
}
