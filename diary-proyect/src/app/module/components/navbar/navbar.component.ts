import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onToggleMenu: EventEmitter<any> = new EventEmitter();

  public sidebarItems = [
    { label: 'Contactos', icon: 'group', url: '/list-contact' },
    { label: 'Acerca de...', icon: 'settings', url: '/about' },
  ];

  counter = 0;

  dataUser: any = {
    userEmail: localStorage.getItem('userEmail'),
    userFullName: localStorage.getItem('userFullName'),
    userId: localStorage.getItem('userId'),
    userName: localStorage.getItem('userName'),
    userPassword: localStorage.getItem('userPassword'),
    userPhoto: localStorage.getItem('userPhoto'),
  };

  public getNumberContacts: number = 0;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthLoginService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthLoginService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.numContacts$.subscribe((numContacts) => {
      this.counter = numContacts;
      console.log(this.counter);
    });
    this.getContact();
  }
  openModule(module: any) {
    this.onToggleMenu.emit(true);
  }

  getContact() {
    this.authService.getUserLogeado().subscribe({
      next: (response) => {
        // console.log('RESPONSE',response);
        if (response.succeed) {
          this.dataUser = response.result.user;
          console.log('Usuario Logeado', this.dataUser);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // getContact() {
  //     this.authService.getUserLogeado().subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.dataUser = data.result.user;
  //         console.log(this.dataUser);
  //         localStorage.setItem('userEmail',this.dataUser.userEmail)
  //         localStorage.setItem('userFullName',this.dataUser.userFullName)
  //         localStorage.setItem('userId',this.dataUser.userId)
  //         localStorage.setItem('userName',this.dataUser.userName)
  //         localStorage.setItem('userPassword',this.dataUser.userPassword)
  //         localStorage.setItem('userPhoto',this.dataUser.userPhoto)
  //         localStorage.setItem("user", JSON.stringify(this.dataUser));

  //         this.dataUser = true;
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       }
  //     });
  //   }

  logOut() {
    const dialog = this.dialog.open(DialogConfirmationComponent, {
      width: '450px',
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Cerrar sesión',
        message: '¿Estas seguro de cerrar la sesión?',
      },
    });
    if (dialog) {
      dialog.afterClosed().subscribe((confirmation) => {
        if (confirmation) {
          this.authService.logOut().subscribe({
            next: (response) => {
              if (response.succeed) {
                console.log(response);
                this.snackbar.open(response.message, 'Aceptar', {
                  duration: 1000,
                  panelClass: ['green-snackbar'],
                });
                localStorage.clear();
                this.router.navigate(['/auth/login']);
              }
            },
            error: (error) => {
              console.log(error);
              this.snackbar.open(error.error.message, 'Aceptar', {});
            },
          });
        }
      });
    }
  }
}
