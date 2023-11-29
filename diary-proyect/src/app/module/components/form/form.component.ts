import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formRegister!: FormGroup;

constructor(private fb: FormBuilder) {
  this.initForm();
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


  initForm(){
    this.formRegister = this.fb.group({
      nameField : ['', [Validators.required] ],
    })
  }


  // savePhone(){
  //   this.formRegister.push(this.fb.control(['Nuevo Elemento', Validators.required, Validators.minLength(11), Validators.maxLength(11)]))
  //   console.log(this.nameField.value);
  // }

}
