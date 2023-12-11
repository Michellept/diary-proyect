import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/module/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss'],
})
export class DetailsContactComponent implements OnInit {
  public formEditContact!: FormGroup;
  private _contactService = inject(ContactService);
  contactToData: any;
  contactPhones = this.fb.array([]);
  contactEmails = this.fb.array([]);
  contactNotes = this.fb.array([]);
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private routerActive: ActivatedRoute,
    private router: Router
  ) {
    this.contactToData =
      this.router.getCurrentNavigation()?.extras.state?.['ContactToEdit'];

    // this.contactToEditId = this.routerActive.snapshot.paramMap.get('contactToEdit')
    console.log(this.contactToData);

    this.formEditContact = this.fb.group({
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactPhones: this.fb.array([]),
      contactEmails: this.fb.array([]),
      contactTags: this.fb.array([]),
      contactNotes: [''],
      contactPhoto: [''],
      contactAlias: [''],
      contactBirthday: ['', Validators.required],
      contactCompany: [''],
    });
  }

  ngOnInit(): void {
    this.setDataForm();
  }

  setDataForm() {
    this.formEditContact.patchValue({
      contactFirstName: this.contactToData.contactFirstName,
      contactLastName: this.contactToData.contactLastName,
      contactPhone: this.contactToData.contactPhone,
      contactEmail: this.contactToData.contactEmail,
      contactNotes: this.contactToData.contactNotes,
      contactPhoto: this.contactToData.contactPhoto,
      contactAlias: this.contactToData.contactAlias,
      contactBirthday: this.contactToData.contactBirthday,
      contactCompany: this.contactToData.contactCompany,
    });
  }

  updateContact() {
    const modelUpdate = {
      contactFirstName: this.formEditContact.value.contactFirstName,
      contactLastName: this.formEditContact.value.contactLastName,
      contactPhone: this.formEditContact.value.contactPhone,
      contactEmail: this.formEditContact.value.contactEmail,
      contactNotes: this.formEditContact.value.contactNotes,
      contactPhoto: this.formEditContact.value.contactPhoto,
      contactAlias: this.formEditContact.value.contactAlias,
      contactBirthday: this.formEditContact.value.contactBirthday,
      contactCompany: this.formEditContact.value.contactCompany,
    };
    if (this.formEditContact.valid) {
      const idContact = this.contactToData.contactId;
      this._contactService
        .updateContact(idContact, modelUpdate)

        .subscribe({
          next: (response) => {
            console.log(response);

            if (response.succeed == true) {
              // this.router.navigate(['/list-contact']);
              this._snackBar.open(
                'Contacto actualizado exitosamente',
                'Aceptar',
                {
                  duration: 10 * 1000,
                  panelClass: ['green-snackbar'],
                }
              );
            }
          },
          error: (err) => {
            console.log(err);
            this._snackBar.open(
              'Algo ha pasado al actualizar el contacto',
              'Aceptar',
              {
                duration: 10 * 1000,
                panelClass: ['red-snackbar'],
              }
            );
          },

          complete: () => {},
        });
    } else {
      this.formEditContact.markAllAsTouched();
    }
  }

  isValidField(field: string): boolean | null {
    const control = this.formEditContact.controls[field];
    return control && control.invalid && control.touched;
  }
}
