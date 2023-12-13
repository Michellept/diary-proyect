import { Component, EventEmitter, Output } from '@angular/core';
import { DialogLoadingService } from '../service/dialog-loading.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-tags-botton-sheet',
  templateUrl: './tags-botton-sheet.component.html',
  styleUrls: ['./tags-botton-sheet.component.scss']
})
export class TagsBottonSheetComponent {
@Output() onClose:EventEmitter<any> = new EventEmitter();

tagsArray: string[] = [];
newTag: string = '';

tagSelected: string = '';
public formTag!: FormGroup;

constructor(
  private snackBar: MatSnackBar,
  private fb: FormBuilder,
  private dialogLoading: DialogLoadingService,
  private _bottomSheetRef: MatBottomSheetRef<TagsBottonSheetComponent>
){}







}
