import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit  {

  formRegister!: FormGroup;
  userPhoneContact = this.fb.array([])
  userEmailContact = this.fb.array([])

  constructor(
     private fb: FormBuilder,
    private snackbar: MatSnackBar,
     ){}

ngOnInit(): void {
  this.formRegister = this.fb.group({
    userName : ['', Validators.required],
    userLastName: ['',],
    userEmail: ['', Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)],
    userAlias: [''],
    userCompany:[''],
    userBirthday:[''],
    userPhoto:[''],
    userPhoneContact: this.fb.array(['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]),
  })}



deletePhone(i: number){
  this.userPhoneContact.removeAt(i);
}
addPhone(){
this.userPhoneContact.push(this.fb.control(''))
}

deleteEmail(i:number){
  this.userEmailContact.removeAt(i);
}

addEmail(){
  this.userEmailContact.push(this.fb.control(''))
}

isValidField(field: string): boolean | null {
  const control = this.formRegister.controls[field];
  return control && control.invalid && control.touched;
}

}
