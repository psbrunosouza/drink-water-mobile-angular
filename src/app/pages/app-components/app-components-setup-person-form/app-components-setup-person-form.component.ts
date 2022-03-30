import {Component, Input, OnInit} from '@angular/core';
import {PersonModel} from '../../../@core/models/person.model';
import { v4 as uuidv4 } from 'uuid';
import {PersonService} from '../../../@core/services/database/person.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-app-components-setup-person-form',
  templateUrl: './app-components-setup-person-form.component.html',
  styleUrls: ['./app-components-setup-person-form.component.scss'],
  providers: [PersonService ]
})
export class AppComponentsSetupPersonFormComponent implements OnInit {

  @Input() person: PersonModel;

  constructor(public toastController: ToastController, public personService: PersonService, private router: Router) { }

  ngOnInit() {}

  submit(): void{
    if(!this.person.id){
      console.log('here');
      this.personService.createPerson({...this.person, id: uuidv4(), dailyDrinks: []}).then(() => {
        this.createPersonToast();
        this.router.navigate(['/dashboard']);
      });
    }else {
      this.personService.updatePerson(this.person).then(() => {
        this.createPersonToast();
        this.router.navigate(['/dashboard']);
      });
    }
  }

  async createPersonToast() {
    const toast = await this.toastController.create({
      message: 'Dados salvos com sucesso!',
      duration: 2000
    });
    await toast.present();
  }


}
