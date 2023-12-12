import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/module/services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailInterface } from 'src/app/module/services/interface/email-interface';
import { tagInterface } from 'src/app/module/services/interface/tags-interface';
import { phoneInterface } from 'src/app/module/services/interface/phone-interface';
import { TagDialogComponent } from 'src/app/module/components/tag-dialog/tag-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoadingService } from 'src/app/module/components/service/dialog-loading.service';

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
  contactTags = this.fb.array([]);
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private routerActive: ActivatedRoute,
    private router: Router,
    private dialogLoading: DialogLoadingService,

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
      contactPhoto: this.contactToData.contactPhoto,
      contactAlias: this.contactToData.contactAlias,
      contactBirthday: this.contactToData.contactBirthday,
      contactCompany: this.contactToData.contactCompany,
      contactNotes: this.contactToData.contactNotes,
    });

    // emails array print
    this.contactEmails = this.formEditContact.get('contactEmails') as FormArray;
    this.contactEmails.clear();
    this.contactToData.contactEmails.forEach((email: emailInterface) => {
      this.contactEmails.push(
        this.fb.control(email.emailValue, [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ])
      );
    });

    // tags array print
    this.contactTags = this.formEditContact.get('contactTags') as FormArray;
    this.contactTags.clear();
    this.contactToData.contactTags.forEach((tag: tagInterface) => {
      this.contactTags.push(this.fb.control(tag.tagValue, []));
    });

    // phone array print
    this.contactPhones = this.formEditContact.get('contactPhones') as FormArray;
    this.contactPhones.clear();
    this.contactToData.contactPhones.forEach((tag: phoneInterface) => {
      this.contactPhones.push(this.fb.control(tag.phoneValue, []));
    });
  }

  updateContact() {
    const modelUpdate = {
      contactFirstName: this.formEditContact.value.contactFirstName,
      contactLastName: this.formEditContact.value.contactLastName,
      contactPhones: this.formEditContact.value.contactPhones,
      contactEmails: this.formEditContact.value.contactEmails,
      contactTags: this.formEditContact.value.contactTags,
      contactNotes: this.formEditContact.value.contactNotes,
      contactPhoto: this.formEditContact.value.contactPhoto,
      contactAlias: this.formEditContact.value.contactAlias,
      contactBirthday: this.formEditContact.value.contactBirthday,
      contactCompany: this.formEditContact.value.contactCompany,
    };
console.log('model', modelUpdate);
    //     this.contactEmails = this.formEditContact.get('contactEmails') as FormArray;
    // console.log(    this.contactEmails = this.formEditContact.get('contactEmails') as FormArray);
    if (this.formEditContact.valid) {
      this.dialogLoading.show(
        'Espere por favor, Cargando...',
        'Editando Contacto'
      );
  
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

          complete: () => {
            this.dialogLoading.finish();

          },
        });
    } else {
      this.formEditContact.markAllAsTouched();
    }
  }

  get getContactTagFormArray(){
    return this.formEditContact.get('contactTags') as FormArray;
  }
  addTag(newTag: string) {
    const contactTagsArray = this.formEditContact.get('contactTags') as FormArray;
  
    if (newTag && !contactTagsArray.value.includes(newTag)) {
      contactTagsArray.push(this.fb.control(newTag));
    }
  }
  deleteTag(i:number){
    this.getContactTagFormArray.removeAt(i);
  }


  get getcontactEmailFormArray() {
    return this.formEditContact.get('contactEmails') as FormArray;
  }
  addEmail() {
    this.getcontactEmailFormArray.push(
      this.fb.control('', [
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ])
    );
  }

  deleteEmail(i:number){
    this.getcontactEmailFormArray.removeAt(i);
  }

  
  isValidField(field: string): boolean | null {
    const control = this.formEditContact.controls[field];
    return control && control.invalid && control.touched;
  }
}
