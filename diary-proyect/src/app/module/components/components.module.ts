import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmaiDynamicComponent } from './emai-dynamic/emai-dynamic.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
    DialogConfirmationComponent,
    DialogLoadingComponent,
    EmaiDynamicComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    SharedModule,
    
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    DialogConfirmationComponent,
    EmaiDynamicComponent,
  ]

})
export class ComponentsModule { }
