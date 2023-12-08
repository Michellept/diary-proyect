import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirectivePhone]'
})
export class DirectivesDirective {

  constructor(
    public viewChildPhone :ViewContainerRef,
  ) { }

}
