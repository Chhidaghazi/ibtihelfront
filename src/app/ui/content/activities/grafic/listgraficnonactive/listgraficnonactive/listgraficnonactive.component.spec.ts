import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgraficnonactiveComponent } from './listgraficnonactive.component';

describe('ListgraficnonactiveComponent', () => {
  let component: ListgraficnonactiveComponent;
  let fixture: ComponentFixture<ListgraficnonactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgraficnonactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgraficnonactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
