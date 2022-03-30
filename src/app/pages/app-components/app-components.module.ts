import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppComponentsSetupPersonFormComponent
} from './app-components-setup-person-form/app-components-setup-person-form.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AppComponentsSetupPersonFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AppComponentsSetupPersonFormComponent]
})
export class AppComponentsModule { }
