import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DialogLoadingService } from 'src/app/module/components/service/dialog-loading.service';
import { AuthLoginService } from 'src/app/module/services/auth-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formUser!:FormGroup;

  userAuth:any;


constructor (
  private activatedRoute:ActivatedRoute,
  private _authService:AuthLoginService,
  private fb:FormBuilder,
  private dialogLoading: DialogLoadingService,
  private snackbar : MatSnackBar


){
  
  this.formUser = this.fb.group({
    userEmail: ['', Validators.required],
    userFullName: ['', Validators.required],
    userId: ['', Validators.required],
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
    userPhoto: [''],
    
  })

  const userLogeado = localStorage.getItem('userLogeado');
  if (userLogeado !== null) {
    const userJson = JSON.parse(userLogeado);
    console.log(userLogeado);
    
    this.formUser.patchValue({
      userPhoto: userJson.userPhoto,
      userName: userJson.userName,
      userEmail: userJson.userEmail,
      userPassword: userJson.userPassword,
      userFullName: userJson.userFullName
    })
       }
  console.log(this.formUser.value);
  



}


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}


updateUser(){
  const modelUser = {
    userEmail: this.formUser.value.userEmail,
    userFullName: this.formUser.value.userFullName,
    userPassword: this.formUser.value.userPassword,
    userPhoto: this.formUser.value.userPhoto,
  }
  console.log(modelUser);
  
  if(this.formUser.valid){
    this.dialogLoading.show(
      'Espere por favor, Cargando...',
      'Editando usuario'
    );  
  
    const idUser = localStorage.getItem('userLogeado');
    const user = JSON.parse(idUser!);
    this._authService.updateUser(this.formUser.value, user.userId).subscribe({
      next: (response) => {
        if (response.succeed) {


          this.snackbar.open('Usuario actualizado con exito', 'Aceptar', {
            duration: 10 * 1000,
            panelClass: ['green-snackbar'],
          })
          localStorage.setItem('userLogeado', JSON.stringify(response.result.user));
        }
        console.log(response);
        this.dialogLoading.finish();
      },
      error: (error) => {
        this.snackbar.open('Algo ha pasado al actualizar el usuario', 'Aceptar', {
          duration: 10 * 1000,
          panelClass: ['red-snackbar'],
        })
        console.log(error);
        this.dialogLoading.finish();
      },
    })
  
  }else{
    this.formUser.markAllAsTouched();

  }






}
isValidField(field: string): boolean | null {
  const control = this.formUser.controls[field];
  return control && control.invalid && control.touched;
}
}
