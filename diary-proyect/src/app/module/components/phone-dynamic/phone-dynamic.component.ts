import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-dynamic',
  templateUrl: './phone-dynamic.component.html',
  styleUrls: ['./phone-dynamic.component.scss']
})
export class PhoneDynamicComponent {


  public index!:number;
  @Input() phoneFormDynamic!: FormGroup;
  @Input() phoneControDynamic!: FormControl;
  @Input() phoneValueType!: number;
  


}
