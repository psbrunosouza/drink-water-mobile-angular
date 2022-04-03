import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DrinkModel} from '../models/drink.model';
import {UuidService} from '../providers/uuid.service';

@Injectable()
export class DrinksService {

  constructor(private databaseService: DatabaseService, private uuidService: UuidService) { }

  saveDrink(drink: DrinkModel, parent?: string): Observable<any> {
    const key =  this.uuidService.generateUUID();
    return from(this.databaseService.setStorage({key, value: JSON.stringify({...drink, id: key, parent})}));
  }

  findDrink(key: string): Observable<any> {
    return from(this.databaseService.getStorage({key})).pipe(map(((result) => JSON.parse(result.value))));
  }
}
