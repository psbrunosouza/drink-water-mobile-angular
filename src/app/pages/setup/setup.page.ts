import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../@core/models/person.model';
import {StorageService} from '../../@core/services/database/storage.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

  submit(): void{
    // this.storage.set('person', this.person);
    this.storage.get('person').then((person) => {
      console.log(person);
    });
  }
}
