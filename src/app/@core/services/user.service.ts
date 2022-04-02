import { Injectable } from '@angular/core';
import {DatabaseService} from '../providers/database.service';
import {UserModel} from '../models/user.model';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  userKey = 'user';

  constructor(private databaseService: DatabaseService) { }

  saveUser(user: UserModel): Observable<any> {
    return from(this.databaseService.setStorage({key: this.userKey, value: JSON.stringify({...user, id: this.userKey})}));
  }

  findUser(): Observable<any> {
    return from(this.databaseService.getStorage({key: this.userKey})).pipe(map(((result) => JSON.parse(result.value))));
  }
}
