import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit  {

  formRegister!: FormGroup;
  userPhoneContact = this.fb.array([])
  userEmail = this.fb.array([])

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private createUserService: ContactService,
    private router: Router
     ){}

ngOnInit(): void {
  this.formRegister = this.fb.group({
    userName : ['', Validators.required],
    userLastName: ['',],
    userEmail: ['', [Validators.required, Validators.email]],
    userAlias: [''],
    userCompany:[''],
    userBirthday:[''],
    userPhoto:[''],
    userNotes: [''],
    userPassword: ['', Validators.required],
    userPhoneContact: this.fb.array(['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]),
  })}



  saveContact(){

    const modelRegister = {

      userName: this.formRegister.value.userName,
      userLastName: this.formRegister.value.userLastName,
      userEmail: this.formRegister.value.userEmail,
      userAlias: this.formRegister.value.userAlias,
      userCompany: this.formRegister.value.userCompany,
      userBirthday: this.formRegister.value.userBirthday,
      userPhoto: this.formRegister.value.userPhoto,
      userNotes: this.formRegister.value.userNotes,
      userPasswpord: this.formRegister.value.userPassword,
      userPhoneContact: this.formRegister.value.userPhoneContact
    };

    console.log(modelRegister);



    if(this.formRegister.valid){
      this.createUserService.createContact(modelRegister).subscribe({
     
        next: (response) =>{
          console.log(response);
          console.log(response.succeed);

          if(response.succeed){
            this.snackbar.open('Usuario creado exitosamente', 'Aceptar', {
              duration: 10 * 1000,
              panelClass: ['green-snackbar']
            }) 
          // this.router.navigate(['/list-contact']);
      
          }
          this.snackbar.open('Error al crear el usuario', 'Aceptar', {
            duration: 10 * 1000,
            panelClass: ['red-snackbar']
          })
        },
      error: (err) =>{
        console.log(err);
        this.snackbar.open('Error al crear el usuario', 'Aceptar', {
          duration: 10 * 1000,
          panelClass: ['red-snackbar']
        })
      }
      },)
    }else {
      this.snackbar.open('Error al crear el usuario', 'Aceptar', {
        duration: 10 * 1000,
        panelClass: ['red-snackbar']
      })
      console.log(this.formRegister.value);
      this.formRegister.markAllAsTouched();
      return;
    }

  }



deletePhone(i: number){
  this.userPhoneContact.removeAt(i);
}
addPhone(){
this.userPhoneContact.push(this.fb.control(''))
}

deleteEmail(i:number){
  this.userEmail.removeAt(i);
}

addEmail(){
  this.userEmail.push(this.fb.control(''))
}

isValidField(field: string): boolean | null {
  const control = this.formRegister.controls[field];
  return control && control.invalid && control.touched;
}

}
