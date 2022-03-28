import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../@core/models/person.model';
import {StorageService} from '../../@core/services/database/storage.service';
import {Router} from '@angular/router';
import {PersonService} from '../../@core/services/database/person.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  providers: [PersonService]
})
export class SetupPage implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.loadPersonInformation();
  }

  loadPersonInformation(): void {
    this.personService.findPerson().then((person: PersonModel) => {
      console.log(person);
      if(!!person){
        this.router.navigate(['/dashboard']);
      }
    });
  }

  submit(): void{
    this.personService.createPerson(this.person);
  }
}
