
import {DailyMillilitersModel} from './daily-milliliters.model';
import {DefaultModel} from './default.model';

export class UserModel extends DefaultModel{
  public height: number;
  public weight: number;
  public age: number;
  public dailyMillilitersModels: DailyMillilitersModel[];
}
