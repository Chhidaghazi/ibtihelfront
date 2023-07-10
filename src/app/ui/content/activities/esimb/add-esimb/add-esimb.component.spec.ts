import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEsimbComponent } from './add-esimb.component';

describe('AddEsimbComponent', () => {
  let component: AddEsimbComponent;
  let fixture: ComponentFixture<AddEsimbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEsimbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEsimbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
