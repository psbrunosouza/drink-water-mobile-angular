import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../@core/models/person.model';
import {StorageService} from '../../@core/services/database/storage.service';
import {Router} from '@angular/router';
import {PersonService} from '../../@core/services/database/person.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
  providers: [PersonService]
})
export class SetupPage implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private storage: StorageService, private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.loadPersonInformation();
  }

  loadPersonInformation(): void {
    this.storage.init().then(() => {
      this.personService.findPerson().then((person: PersonModel) => {
        if(!!person){
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }
}
