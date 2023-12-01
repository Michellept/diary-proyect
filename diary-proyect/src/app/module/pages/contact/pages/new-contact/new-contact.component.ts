import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit  {
  selectedType: string = ''; // Variable para almacenar el tipo seleccionado

  formRegister!: FormGroup;
  contactPhone = this.fb.array([])
  contactEmail = this.fb.array([])

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private createcontactService: ContactService,
    private router: Router
     ){}

ngOnInit(): void {
  this.formRegister = this.fb.group({
    contactFirstName : ['', Validators.required],
    contactLastName: ['', Validators.required],
    // contactEmail: this.fb.array([],[Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    contactEmail: this.fb.array([this.fb.control('', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])]),
    contactAlias: [''],
    contactCompany:[''],
    contactBirthday:['', Validators.required],
    contactPhoto:[''],
    contactNotes: [''],
    contactPhone: this.fb.array([],)  // También puedes aplicar Validators.required si el FormArray no debe estar vacío
  })}



  saveContact(){

    const modelRegister = {
      contactFirstName: this.formRegister.value.contactFirstName,
      contactLastName: this.formRegister.value.contactLastName,
      contactEmail: this.formRegister.value.contactEmail,
      contactAlias: this.formRegister.value.contactAlias,
      contactCompany: this.formRegister.value.contactCompany,
      contactBirthday: this.formRegister.value.contactBirthday,
      contactPhoto: this.formRegister.value.contactPhoto,
      contactNotes: this.formRegister.value.contactNotes,
      contactPhone: this.formRegister.value.contactPhone
    };

    console.log(modelRegister);



    if(this.formRegister.valid){
      this.createcontactService.createContact(modelRegister).subscribe({
     
        next: (response) =>{
          console.log(response.succeed);
          console.log(modelRegister);
          
          if(response.succeed === true){
            this.snackbar.open('Usuario creado exitosamente', 'Aceptar', {
              duration: 10 * 1000,
              panelClass: ['green-snackbar']
            }) 
          // this.router.navigate(['/list-contact']);
          }
        },
      error: (err) =>{
        console.log(err);
        this.snackbar.open('Error al crear el usuario', 'Aceptar', {
          duration: 10 * 1000,
          panelClass: ['red-snackbar']
        })
      },
      },
        
      )
    }else {
      this.snackbar.open('Error al crear el usuario', 'Aceptar', {
        duration: 10 * 1000,
        panelClass: ['red-snackbar']
      })
      console.log(this.formRegister.value) ;
      this.formRegister.markAllAsTouched();
      return;
    }

  }


get getcontactEmailFormArray(){
  return this.formRegister.get('contactEmail') as FormArray
}
  
  get getcontactPhoneFormArray() {
    return this.formRegister.get('contactPhone') as FormArray;
}

deletePhone(i: number){
  this.getcontactPhoneFormArray.removeAt(i);
}
addPhone(){
  
  this.getcontactPhoneFormArray.push(this.fb.control('', ));

}

deleteEmail(i:number){
  this.getcontactEmailFormArray.removeAt(i);
}

addEmail(){
  this.getcontactEmailFormArray.push(this.fb.control('', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]));
}

isValidField(field: string): boolean | null {
  const control = this.formRegister.controls[field];
  return control && control.invalid && control.touched;
}

isFormatField(field: any): boolean | null {
  const control = this.getcontactEmailFormArray;
  {
  return control && control.invalid && control.touched;
  }}


  // validatorEmail(){
  //   if(this.getcontactEmailFormArray.invalid){
  //     this.snackbar.open('El correo tiene un formato invalido', 'Aceptar', {
  //       duration: 10 * 1000,
  //       panelClass: ['red-snackbar']
  //     })
  //     if(this.getcontactEmailFormArray.valid){
  //         console.log("validoo");
          
  //       }
  //     } 
      
  //     return
    
  // }

// isFormatField(field: any): boolean | null {
//   const control = this.fb.array(field);{
//     return control && control.invalid && control.touched;
//   }
// }

}
