import { Component, OnInit } from '@angular/core';
import {

  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/module/services/auth-login.service';
import { authInterface } from 'src/app/module/services/interface/auth-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private snackBar: MatSnackBar,
    private authService: AuthLoginService
  ) {

  }

  formLogin: FormGroup  = this.fb.group({
    authUser: ['', Validators.required],
    authPassword: ['', Validators.required],
  })

  ngOnInit(): void {
    
  }


  onLogin() {

    console.log(this.formLogin.value);
    
    const model : authInterface  = {
      authUser: this.formLogin.value.authUser,
      authPassword: this.formLogin.value.authPassword
    }

    if (this.formLogin.valid) {
      console.log(this.formLogin);
      this.authService.logIn(model).subscribe({        
        next: (response) => {
          console.log(response);
          
          if (response.succeed) {
            this.router.navigate(['/list-contact']);
          }
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      this.formLogin.markAllAsTouched();
      this.snackBar.open(
        'Ingresa la información completa del usuario',
        'Aceptar',
        { duration: 10 * 1000, panelClass: ['yellow-snackbar'] }
      );
      this.formLogin.markAllAsTouched();
    }
  }

  isValidField(field: string): boolean | null {
    const control = this.formLogin.controls[field];
    return control && control.invalid && control.touched;
  }
}