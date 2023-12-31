import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from 'src/app/module/services/contact.service';
import { DialogConfirmationService } from '../../../../components/service/dialog-confirmation.service';
import { DialogLoadingService } from 'src/app/module/components/service/dialog-loading.service';
import { DialogConfirmationComponent } from '../../../../components/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent implements OnInit {

  private numContacts = new BehaviorSubject<number>(0);
  numContacts$=this.numContacts.asObservable();



  public dataTable = [];
  offset = 1;
  limit = 10;
  searchTerm = '';
  allContact = 0;
  countContact = 0;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private ContactService: ContactService,
    private snackbar: MatSnackBar,
    private dialogLoading: DialogLoadingService,
    private dialog: MatDialog,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.getAllContacts(this.offset, this.searchTerm);
  }

  getAllContacts(offset: number, searchTerm: string) {
    this.dialogLoading.show(
      'Espere por favor, Cargando...',
      'Consultando contactos'
    );

    //calculate offset
    this.offset = (offset - 1) * this.limit;
    //equalize searchTerm
    this.searchTerm = searchTerm;
    //data send
    const data = {
      offset: this.offset,
      limit: this.limit,
      searchTerm: this.searchTerm,
    };

    this.ContactService.getAllContacts(data).subscribe({ 
      next: (response) => {
        if (response.succeed) {
          console.log(response);
          this.allContact = response.result.count;
          this.allContact = this.allContact + this.countContact;
          
          localStorage.setItem('contact', this.allContact.toString());

          const data = response.result.list;
          this.dataTable = data;
        }
      },
      error: (err) => {
        console.log(err);
      },

      complete: () => {
        this.dialogLoading.finish();
      },
    });
  }
  pageChanged(event: any): void {
    this.limit = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getAllContacts(this.allContact, this.searchTerm);
  }
  deleteContactId(id: number) {
    const dialog = this.dialog.open(DialogConfirmationComponent, {
      width: '450px',
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Eliminar contacto',
        message: '¿Estas seguro de eliminar este contacto?',
      },
    });
  
    if (dialog) {
      dialog.afterClosed().subscribe((confirmation) => {
        if (confirmation) {
          this.dialogLoading.show('Cargando', '  Espere por favor...');
          this.ContactService.deleteContact(id).subscribe({
            next: (response) => {
              if (response.succeed) {
                console.log(response);
                this.countContact--;
                this.snackbar.open(response.message, 'Aceptar', {
                  duration: 1000,
                });

                this.getAllContacts(this.offset, this.searchTerm);
              }
            },
            error: (err) => {
              this.snackbar.open(err.error.message, 'Aceptar', {
                duration: 1000,
              });
              console.log(err);
            },

            //finish the next and error...
            complete: () => {
              this.getAllContacts(-1, '');
              this.dialogLoading.finish();
            },
          });
        }
      });
    }


  }

  navEditContact(id: number) {
    this.router.navigate(['/details-contact'], {
      state: { ContactToEdit: id }
    });
    
  }
  // onButtonClick(contactId: number) {
  //   if (typeof contactId === 'number' && !isNaN(contactId)) {
  //     console.log(contactId);
  //     this.navEditContact(contactId);
  //   } else {
  //     console.error('El valor de contactId no es un número válido.');
  //   }
  // }
}  
