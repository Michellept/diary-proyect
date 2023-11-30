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


  show(message:string){
    this.dialogo = this.dialog.open(DialogLoadingComponent,{
      width: '250px',
      disableClose:true,
      autoFocus:true,
      data:{
        message:message
      }
    })
  }

  close() {
    this.dialog.closeAll();
    this.router.navigate(['/auth/login']);  
  }

  finish() {
    this.dialog.closeAll();
  }

}
