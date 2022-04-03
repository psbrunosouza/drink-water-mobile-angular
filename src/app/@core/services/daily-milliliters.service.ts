import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {UuidService} from '../providers/uuid.service';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DailyMillilitersModel} from '../models/daily-milliliters.model';

@Injectable()
export class DailyMillilitersService {

  userKey = 'user';

  constructor(private databaseService: DatabaseService, private uuidService: UuidService) { }

  // saveDailyMilliliters(userDatadailyMilliliters: DailyMillilitersModel): Observable<any> {
  //   const key =  this.uuidService.generateUUID();
  //   return from(this.databaseService.setStorage({key: this.userKey, value: JSON.stringify({...dailyMilliliters, id: key})}));
  // }

  // findDailyMilliliters(key: string): Observable<any> {
  //   return from(this.databaseService.getStorage({key})).pipe(map(((result) => JSON.parse(result.value))));
  // }
}
