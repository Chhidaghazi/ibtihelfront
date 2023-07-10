import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPrestationComponent } from './ajout-prestation.component';

describe('AjoutPrestationComponent', () => {
  let component: AjoutPrestationComponent;
  let fixture: ComponentFixture<AjoutPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPrestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
