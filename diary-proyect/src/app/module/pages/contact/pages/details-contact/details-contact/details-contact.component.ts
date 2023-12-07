import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss'],
})
export class DetailsContactComponent implements OnInit {
  @Input() idContact?: number;

  public formEditContact!: FormGroup;
  private _contactService = inject(ContactService);
  constructor(private fb: FormBuilder) {
    this.formEditContact = this.fb.group({
      contactName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactPhone: [''],
      contactEmail: [''],
      contactNotes: [''],
      contactPhoto: [''],
      contactAlias: [''],
      contactBirthday: ['', Validators.required],
      contactCompany: [''],
    });
  }

  dataTable = [
    {
      contactId: 1,
      contactName: 'Jhon',
      contactLastName: 'Doe',
      contactEmail: '5kS6e@example.com',
      contactAlias: 'Jhon Doe',
      contactCompany: 'Company 1',
      contactBirthday: '1990-01-01',
      contactPhoto: 'https://via.placeholder.com/150',
      contactNotes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contactPhone: '123456789',
    },
  ];

  ngOnInit(): void {
    // if (this.idContact) {
    //   this._contactService.getAllContacts(this.idContact).subscribe({
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   });
    // }
  }

  isValidField(field: string): boolean | null {
    const control = this.formEditContact.controls[field];
    return control && control.invalid && control.touched;
  }
}
