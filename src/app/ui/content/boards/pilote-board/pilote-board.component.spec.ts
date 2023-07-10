import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiloteBoardComponent } from './pilote-board.component';

describe('PiloteBoardComponent', () => {
  let component: PiloteBoardComponent;
  let fixture: ComponentFixture<PiloteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiloteBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiloteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
