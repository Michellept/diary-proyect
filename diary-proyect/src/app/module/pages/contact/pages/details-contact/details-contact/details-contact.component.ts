import { Component, Input, OnInit, inject } from '@angular/core';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss'],
})
export class DetailsContactComponent implements OnInit {
  @Input() idContact?: number;

  private _contactService = inject(ContactService);
  constructor() {}

  ngOnInit(): void {
    // if (this.idContact) {
    //   this._contactService.getAllContacts(this.idContact).subscribe({
    //     next: (response) => {
    //       console.log(response);
    //     },
    //   });
    // }
  }
}
