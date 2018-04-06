import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputCheckboxComponent } from './custom-input-checkbox.component';

describe('CustomInputCheckboxComponent', () => {
  let component: CustomInputCheckboxComponent;
  let fixture: ComponentFixture<CustomInputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
