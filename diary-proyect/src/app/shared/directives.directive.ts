import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicPhone]'
})
export class DirectivesDirective {

  constructor(
    public viewChildPhone :ViewContainerRef,
  ) { }

}
