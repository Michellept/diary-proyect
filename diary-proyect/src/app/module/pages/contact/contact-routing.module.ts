import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { NewContactComponent } from './pages/new-contact/new-contact.component';
import { DetailsContactComponent } from './pages/details-contact/details-contact/details-contact.component';

const routes: Routes = [
  {
    path:'list-contact',
    component:ListContactComponent,
  },
  {
    path:'new-contact',
    component:NewContactComponent,
  },
  {
    path:'details-contact/:id',
    component:DetailsContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
