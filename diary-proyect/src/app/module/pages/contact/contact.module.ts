import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';


@NgModule({
  declarations: [
    ListContactComponent,
    NewContactComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
