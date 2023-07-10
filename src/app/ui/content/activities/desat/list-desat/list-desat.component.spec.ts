import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesatComponent } from './list-desat.component';

describe('ListDesatComponent', () => {
  let component: ListDesatComponent;
  let fixture: ComponentFixture<ListDesatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDesatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
