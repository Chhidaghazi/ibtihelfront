import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEsimbComponent } from './list-esimb.component';

describe('ListEsimbComponent', () => {
  let component: ListEsimbComponent;
  let fixture: ComponentFixture<ListEsimbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEsimbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEsimbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
