import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    NavbarComponent,
    FormComponent,

  ]

})
export class ComponentsModule { }
