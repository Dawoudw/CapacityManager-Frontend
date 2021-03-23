import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocactionComponent } from './locaction.component';

describe('LocactionComponent', () => {
  let component: LocactionComponent;
  let fixture: ComponentFixture<LocactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
