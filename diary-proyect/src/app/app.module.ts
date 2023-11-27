import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/pages/login/login.component';
import { ListContactComponent } from './module/pages/contact/list-contact/list-contact.component';
import { NewContactComponent } from './module/pages/contact/new-contact/new-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListContactComponent,
    NewContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
