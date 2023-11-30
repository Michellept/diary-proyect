import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  constructor(
    private dialog:MatDialog,
  ) { }


open(title:string, message:string){
  const dialog : MatDialogRef<DialogConfirmationComponent> = this.dialog.open(DialogConfirmationComponent,{
    
    width: '250px',
    disableClose:true,
    autoFocus:true,
    data:{
      title:title,
      message:message
    },
  });
  return dialog;
}

}
