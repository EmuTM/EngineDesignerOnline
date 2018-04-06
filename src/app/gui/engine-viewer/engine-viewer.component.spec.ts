import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineViewerComponent } from './engine-viewer.component';

describe('EngineViewerComponent', () => {
  let component: EngineViewerComponent;
  let fixture: ComponentFixture<EngineViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
