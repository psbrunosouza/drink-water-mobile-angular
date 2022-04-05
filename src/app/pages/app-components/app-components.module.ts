import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppComponentsSetupUserFormComponent
} from './app-components-setup-person-form/app-components-setup-user-form.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AppComponentsSetupUserFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AppComponentsSetupUserFormComponent]
})
export class AppComponentsModule { }
