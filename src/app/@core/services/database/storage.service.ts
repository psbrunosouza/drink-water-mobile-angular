import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private appStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    this.appStorage = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    await this.appStorage.set(key, value);
  }

  async get(key: string): Promise<any>{
    return this.appStorage.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.appStorage.remove(key);
  }
}
