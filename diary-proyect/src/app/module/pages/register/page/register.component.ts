import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/module/services/auth-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;

constructor(
  private fb: FormBuilder,
  private router: Router,
  private snackBar: MatSnackBar,
  private createUserService: AuthLoginService,

){
  this.formRegister = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    userPhoto: [''],

  });
}

ngOnInit(): void {
    
}

onRegister(){

  console.log(this.formRegister.value);
  
  const modelRegister ={
    userEmail: this.formRegister.value.userEmail,
    userPassword: this.formRegister.value.userPassword,
    userName: this.formRegister.value.userName,
    userPhoto: this.formRegister.value.userPhoto
  };



  if(this.formRegister.valid){
    this.createUserService.registerNewUser(modelRegister).subscribe({
      next: (response) =>{
        console.log(response);

        if(response.succeed){
          this.snackBar.open('Usuario creado exitosamente', 'Aceptar', {
            duration: 10 * 1000,
            panelClass: ['green-snackbar']
          })
          this.router.navigate(['/auth/login']);

        }
        
      },
      error: (err) =>{
        console.log(err);
        this.snackBar.open('Error al crear el usuario', 'Aceptar', {
          duration: 10 * 1000,
          panelClass: ['red-snackbar']
        })
      }
    })
  }else {
    this.formRegister.markAllAsTouched();
    this.snackBar.open(
      'Ingresa la información completa del usuario',
      'Aceptar',
      { duration: 10 * 1000, panelClass: ['yellow-snackbar'] }
    );
    this.formRegister.markAllAsTouched();
  }
  }

  isValidField(field: string): boolean | null {
    const control = this.formRegister.controls[field];
    return control && control.invalid && control.touched;
  }

}

