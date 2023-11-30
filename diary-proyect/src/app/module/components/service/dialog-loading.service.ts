import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLoadingComponent } from '../dialog-loading/dialog-loading.component';

@Injectable({
  providedIn: 'root'
})
export class DialogLoadingService {
  public _shown = false;
  public dialogo!: MatDialogRef<DialogLoadingComponent>;
  constructor(
    private dialog:MatDialog,
    private router:Router,
  ) { }


  show(message:string, title:string) {
    this.dialogo = this.dialog.open(DialogLoadingComponent,{
      width: '450px',
      disableClose:true,
      autoFocus:true,
      data:{
        title:title,
        message:message
      }
    })
  }

  close() {
    this.dialog.closeAll();
  }

  finish() {
    this.dialog.closeAll();
  }

}
