import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './module/components/components.module';
import { DirectivesDirective } from './shared/directives.directive';
import { SharedModule } from './shared/shared.module';
import { TagDialogComponent } from './module/components/tag-dialog/tag-dialog.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { TagsBottonSheetComponent } from './module/components/tags-botton-sheet/tags-botton-sheet.component';
import { AboutComponent } from './module/pages/about/pages/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TagDialogComponent,
    TagsBottonSheetComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule  

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
