import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from 'src/app/module/services/contact.service';
import { DialogConfirmationService } from '../../../../components/service/dialog-confirmation.service';
import { DialogLoadingService } from 'src/app/module/components/service/dialog-loading.service';
import { DialogConfirmationComponent } from '../../../../components/dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss'],
})
export class ListContactComponent implements OnInit {
  @Output() allContactChance = new EventEmitter<number>();

  public dataTable = [];
  offset = 1;
  limit = 10;
  searchTerm = '';
  allContact = localStorage.getItem('contact')
    ? Number(localStorage.getItem('contact'))
    : 0;
  countContact = 0;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private ContactService: ContactService,
    private snackbar: MatSnackBar,
    private dialogLoading: DialogLoadingService,
    private dialog: MatDialog
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
          console.log((this.allContact = response.result));
          console.log((this.allContact = this.allContact + this.countContact));

          this.allContact = response.result.count;
          this.allContact = this.allContact + this.countContact;
          localStorage.setItem('contact', this.allContact.toString());


          // console.log(localStorage.setItem('contact', this.allContact.toString())          );

          console.log('allContact', this.allContact);

          // console.log((this.dataTable = response.result.count));
          const data = response.result.list;
          this.dataTable = data;

          const end =
          (data.length + this.offset) / this.limit +
          this.limit -
          this.allContact;
          this.dataTable = data.result.list.splice(0, this.limit - end);

          this.totalPages = Math.ceil(this.allContact / this.limit);
          this.currentPage = this.offset / this.limit + 1;
          this.allContactChance.emit(this.allContact);
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
    console.log(event.pageIndex + 1);
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
          this.ContactService.deleteContact(id).subscribe({
            next: (response) => {
              if (response.succeed) {
                console.log(response);
                this.countContact--;

                this.dialogLoading.show('Cargando', '  Espere por favor...');
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
              this.getAllContacts(1, '');
              this.allContactChance.emit(this.allContact);
              this.dialogLoading.finish();
            },
          });
        }
      });
    }
  }
}
