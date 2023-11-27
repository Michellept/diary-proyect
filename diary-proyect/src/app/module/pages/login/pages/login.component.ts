import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from 'src/app/module/services/auth-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.fb.group({
    userEmail: ['', Validators.required],
    userPassword: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthLoginService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.formLogin.valid) {
      const credentialsToSend = {
        authUser: this.formLogin.value.userEmail,
        authPassword: this.formLogin.value.userPassword,
      };
      this.authService.logIn(credentialsToSend).subscribe({
        next: (response) => {
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