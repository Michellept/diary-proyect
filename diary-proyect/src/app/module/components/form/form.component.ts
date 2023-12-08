import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

@Input() form!: FormGroup;
@Input() controlName!:string;




constructor(private fb: FormBuilder) {
}

  ngOnInit(): void {

  }


}
