import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputTextComponent } from './custom-input-text.component';

describe('CustomInputTextComponent', () => {
  let component: CustomInputTextComponent;
  let fixture: ComponentFixture<CustomInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputTextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
