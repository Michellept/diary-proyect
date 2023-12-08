import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneDynamicComponent } from './phone-dynamic.component';

describe('PhoneDynamicComponent', () => {
  let component: PhoneDynamicComponent;
  let fixture: ComponentFixture<PhoneDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
