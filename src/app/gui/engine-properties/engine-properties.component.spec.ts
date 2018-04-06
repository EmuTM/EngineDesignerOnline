import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginePropertiesComponent } from './engine-properties.component';

describe('EnginePropertiesComponent', () => {
  let component: EnginePropertiesComponent;
  let fixture: ComponentFixture<EnginePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
