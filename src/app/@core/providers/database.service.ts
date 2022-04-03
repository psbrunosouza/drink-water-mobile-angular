import { Injectable } from '@angular/core';
import {GetResult, Storage, SetOptions, GetOptions, RemoveOptions} from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor() { }

  async setStorage(data: SetOptions): Promise<void> {
    await Storage.set(data);
  }

  async getStorage(data: GetOptions): Promise<GetResult> {
    return Storage.get(data);
  }

  async removeStorage(data: RemoveOptions): Promise<void> {
    return Storage.remove(data);
  }
}
