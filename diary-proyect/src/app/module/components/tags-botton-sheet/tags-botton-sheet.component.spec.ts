import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsBottonSheetComponent } from './tags-botton-sheet.component';

describe('TagsBottonSheetComponent', () => {
  let component: TagsBottonSheetComponent;
  let fixture: ComponentFixture<TagsBottonSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsBottonSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsBottonSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
