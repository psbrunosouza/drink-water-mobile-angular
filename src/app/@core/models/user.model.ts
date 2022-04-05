
import {DailyMillilitersModel} from './daily-milliliters.model';
import {DefaultModel} from './default.model';

export class UserModel extends DefaultModel{
  public weight: number;
  public startTime: Date | string;
  public endTime: Date | string;
  public dailyMillilitersModels: DailyMillilitersModel[];
}
