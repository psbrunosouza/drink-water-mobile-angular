import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../../../@core/models/person.model';
import {StorageService} from '../../../../@core/services/database/storage.service';
import {PersonService} from '../../../../@core/services/database/person.service';

@Component({
  selector: 'app-dashboard-person',
  templateUrl: './dashboard-person.component.html',
  styleUrls: ['./dashboard-person.component.scss'],
  providers: [PersonService ]
})
export class DashboardPersonComponent implements OnInit {
  person: PersonModel;

  constructor(private storage: StorageService, private personService: PersonService) { }

  ngOnInit() {
    this.person = new PersonModel();

    this.loadPersonInformation();
  }

  loadPersonInformation(): void {
    this.storage.init().then(() => {
      this.personService.findPerson().then((person: PersonModel) => {
        this.person = person;
      });
    });
  }
}
