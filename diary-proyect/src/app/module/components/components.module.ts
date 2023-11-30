import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
    DialogConfirmationComponent,
    DialogLoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    
  ],
  exports: [
    NavbarComponent,
    FormComponent,
    DialogConfirmationComponent,
    
  ]

})
export class ComponentsModule { }
