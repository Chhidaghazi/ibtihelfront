import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgraficComponent } from './addgrafic.component';

describe('AddgraficComponent', () => {
  let component: AddgraficComponent;
  let fixture: ComponentFixture<AddgraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgraficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
