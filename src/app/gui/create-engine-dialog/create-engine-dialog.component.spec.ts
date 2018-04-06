import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEngineDialogComponent } from './create-engine-dialog.component';

describe('CreateEngineDialogComponent', () => {
  let component: CreateEngineDialogComponent;
  let fixture: ComponentFixture<CreateEngineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEngineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEngineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
