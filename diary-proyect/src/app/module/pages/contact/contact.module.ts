import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsContactComponent } from './pages/details-contact/details-contact/details-contact.component';


@NgModule({
  declarations: [
    ListContactComponent,
    NewContactComponent,
    DetailsContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
})
export class ContactModule { }
