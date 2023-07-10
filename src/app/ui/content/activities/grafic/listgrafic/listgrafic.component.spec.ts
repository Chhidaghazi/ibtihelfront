import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgraficComponent } from './listgrafic.component';

describe('ListgraficComponent', () => {
  let component: ListgraficComponent;
  let fixture: ComponentFixture<ListgraficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgraficComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
