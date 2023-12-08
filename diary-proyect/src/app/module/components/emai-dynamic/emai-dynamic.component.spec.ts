import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaiDynamicComponent } from './emai-dynamic.component';

describe('EmaiDynamicComponent', () => {
  let component: EmaiDynamicComponent;
  let fixture: ComponentFixture<EmaiDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmaiDynamicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmaiDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
