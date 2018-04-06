import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUploadComponent } from './custom-upload.component';

describe('CustomUploadComponent', () => {
  let component: CustomUploadComponent;
  let fixture: ComponentFixture<CustomUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
