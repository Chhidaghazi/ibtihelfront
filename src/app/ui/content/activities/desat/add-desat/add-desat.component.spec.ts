import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesatComponent } from './add-desat.component';

describe('AddDesatComponent', () => {
  let component: AddDesatComponent;
  let fixture: ComponentFixture<AddDesatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDesatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
