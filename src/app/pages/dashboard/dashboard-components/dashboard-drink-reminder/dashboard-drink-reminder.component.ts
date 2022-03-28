import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../../../@core/models/person.model';
import {PersonService} from '../../../../@core/services/database/person.service';

@Component({
  selector: 'app-dashboard-drink-reminder',
  templateUrl: './dashboard-drink-reminder.component.html',
  styleUrls: ['./dashboard-drink-reminder.component.scss'],
  providers: [PersonService]
})
export class DashboardDrinkReminderComponent implements OnInit {

  person: PersonModel;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.person = new PersonModel();

    this.loadPerson();
  }

  loadPerson(): void {
    this.personService.findPerson().then((person) => {
      this.person = person;
    });
  }
}
