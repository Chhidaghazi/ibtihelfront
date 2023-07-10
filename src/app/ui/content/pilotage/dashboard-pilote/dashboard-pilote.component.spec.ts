import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPiloteComponent } from './dashboard-pilote.component';

describe('DashboardPiloteComponent', () => {
  let component: DashboardPiloteComponent;
  let fixture: ComponentFixture<DashboardPiloteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPiloteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPiloteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
