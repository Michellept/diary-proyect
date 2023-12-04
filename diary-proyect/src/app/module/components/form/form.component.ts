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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    

    // obversable 
    // this.nameField.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // )

  }




  // savePhone(){
  //   this.formRegister.push(this.fb.control(['Nuevo Elemento', Validators.required, Validators.minLength(11), Validators.maxLength(11)]))
  //   console.log(this.nameField.value);
  // }

}
