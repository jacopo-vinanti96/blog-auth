import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResMsgComponent } from './res-msg.component';

describe('ResMsgComponent', () => {
  let component: ResMsgComponent;
  let fixture: ComponentFixture<ResMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
