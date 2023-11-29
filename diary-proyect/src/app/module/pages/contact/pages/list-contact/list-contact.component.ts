import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {
  @Output() totalContactsChance = new EventEmitter<number>();

public dataTable = []
offset = 1;
limit = 10;
searchTerm = '';
totalContacts = 0;
totalContactsSum = 0;
currentPage = 1;
totalPages = 0;

constructor(
  private  ContactService: ContactService, 
  private  snackbar: MatSnackBar
){

}

ngOnInit(): void {
    this.getAllContacts(this.offset, this.searchTerm);
}

getAllContacts(offset: number, searchTerm: string){

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
      console.log(this.dataTable = response.result.list);
      
      this.dataTable = response.result.list; 
           // this.totalContacts = response.result.totalContacts;
      // this.totalContactsSum = response.totalContactsSum;
      // this.currentPage = response.currentPage;
      // this.totalPages = response.totalPages;
    },
  });
}

deletContactId(id:number){
  this.ContactService.deleteContact(id).subscribe({
    next: (response) => {

      this.snackbar.open(response.message, 'Aceptar', {
        duration: 1000 , 
      })
      
      this.totalContactsSum -1;
      

      this.getAllContacts(this.offset, this.searchTerm);
    },
    error : (err) => {
      this.snackbar.open(err.error.message, 'Aceptar', {
        duration: 1000 , 
      })
    console.log(err);
    
    },
    
    complete: () => {
      this.getAllContacts(1, '');
      // this.totalContactsChance.emit(this.totalContactsSum);
    }
   
  });
}


}
