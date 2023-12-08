import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesDirective } from './directives.directive';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DirectivesDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    DirectivesDirective
  ]

})
export class SharedModule { }
