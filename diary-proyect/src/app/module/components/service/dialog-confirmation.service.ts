import { Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
export interface DialogInformativeParameters {
  title: string;
  question: string
}
@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {
  public title   : string = '';
  public question: string = '';
  public disabled: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInformativeParameters
  ){
  }

confirm() {
  this.disabled = true;
  this.dialogRef.close(true);
}
cancel() {
  this.disabled = false;
  this.dialogRef.close(false);
}
}
