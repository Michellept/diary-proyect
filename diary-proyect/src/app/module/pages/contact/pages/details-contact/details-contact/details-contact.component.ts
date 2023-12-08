import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss'],
})
export class DetailsContactComponent implements OnInit {
  @Input() dataTable: any;

  public formEditContact!: FormGroup;
  private _contactService = inject(ContactService);
  contactToEditId : any;

  constructor(private fb: FormBuilder, 
    private router:Router) {


    // this.contactToEditId =
    //  this.router.getCurrentNavigation().extras.state['ContactToEdit'];
    console.log(this.contactToEditId);
    

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



  ngOnInit(): void {

    
  }

  isValidField(field: string): boolean | null {
    const control = this.formEditContact.controls[field];
    return control && control.invalid && control.touched;
  }
}
