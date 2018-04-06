import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCylinderDialogComponent } from './add-cylinder-dialog.component';

describe('AddCylinderDialogComponent', () => {
  let component: AddCylinderDialogComponent;
  let fixture: ComponentFixture<AddCylinderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCylinderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCylinderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
