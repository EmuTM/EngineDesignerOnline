import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputSliderComponent } from './custom-input-slider.component';

describe('CustomInputSliderComponent', () => {
  let component: CustomInputSliderComponent;
  let fixture: ComponentFixture<CustomInputSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
