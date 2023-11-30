import { Component ,EventEmitter,Input, Output, } from '@angular/core';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() allContactChance = new EventEmitter<number>();
  allContact = localStorage.getItem('contact')? Number(localStorage.getItem('contact')): 0;

  public getNumberContacts:number=0;
constructor(
  private dialog: MatDialog,
  private router:Router,
  private authService: AuthLoginService,
  private snackbar:MatSnackBar,

){}

ngOnInit(): void {
this.getNumberContacts = localStorage.getItem('contact')? Number(localStorage.getItem('contact')): 0
}


logOut(){
  const dialog = this.dialog.open(DialogConfirmationComponent,{
    width:'450px',
    disableClose:true,
    autoFocus:true,
    data:{
      title:'Cerrar sesión',
      message:'¿Estas seguro de cerrar la sesión?'
    }
  })
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
              })
              localStorage.clear();
              this.router.navigate(['/auth/login']);
            }
          },
          error: (error) => {
            console.log(error);
            this.snackbar.open(error.error.message, 'Aceptar', {
              
            })
          }
        })
      }
    })
    
  }
}








// chanceContacts(contacs: number) {
//   console.log(contacs, 'chanceContacts');
//   this.allContact = contacs
//   this.allContactChance.emit(contacs);
//   console.log(this.allContact, 'chanceContacts');
//   localStorage.setItem('contacs',this.allContact.toString())

// }
}
