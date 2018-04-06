import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStepsComponent } from './custom-steps.component';

describe('CustomStepsComponent', () => {
  let component: CustomStepsComponent;
  let fixture: ComponentFixture<CustomStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomStepsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
