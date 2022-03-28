import { Component, OnInit } from '@angular/core';
import {PersonModel} from '../../@core/models/person.model';
import {StorageService} from '../../@core/services/database/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {

  person: PersonModel = new PersonModel();

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.loadPersonInformation();
  }

  loadPersonInformation(): void {
    this.storageService.init().then(() => {
      this.storageService.get('person').then((person: PersonModel) => {
        if(!!person){
          this.router.navigate(['/dashboard']);
        }
      });
    });
  }

  submit(): void{
    this.storageService.set('person', this.person);
  }
}
