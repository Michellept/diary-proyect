import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/module/services/contact.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.scss']
})
export class ListContactComponent implements OnInit {

public dataTable = []
offset = 1;
limit = 10;
searchTerm = '';
totalContacts = 0;
totalContactsSum = 0;
currentPage = 1;
totalPages = 0;

constructor(
  private  allContactService: ContactService, 
){

}

ngOnInit(): void {
    
}

getAllContacts(offset: number, searchTerm: string): void{
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


  this.allContactService.getAllContacts(data).subscribe({
    next: (response) => {
      this.dataTable = response.data;
      this.totalContacts = response.totalContacts;
      this.totalContactsSum = response.totalContactsSum;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
    },
  });
}

}
