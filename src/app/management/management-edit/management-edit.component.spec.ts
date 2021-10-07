import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementEditComponent } from './management-edit.component';

describe('ManagementEditComponent', () => {
  let component: ManagementEditComponent;
  let fixture: ComponentFixture<ManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
