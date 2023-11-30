import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogConfirmationParameters {
  title: string;
  message: string
}


@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit{

public title :string = '';
public message :string = '';
public disable: boolean = false;

constructor(
  private dialogRef : MatDialogRef<DialogConfirmationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogConfirmationParameters,
){}


ngOnInit(): void {}



confirm() {
  this.disable = true;
  this.dialogRef.close(true);
}

cancel() {
  this.disable = false;
  this.dialogRef.close(false);
}

}
