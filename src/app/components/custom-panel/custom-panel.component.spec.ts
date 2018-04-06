import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPanelComponent } from './custom-panel.component';

describe('CustomPanelComponent', () => {
  let component: CustomPanelComponent;
  let fixture: ComponentFixture<CustomPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
