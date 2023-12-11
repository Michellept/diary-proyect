import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent {

  tags?:string;


  constructor(
    private dialogRef : MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tags: string[] },
  ){
    // this.tags = data.tags.slice();
  }


  




}


