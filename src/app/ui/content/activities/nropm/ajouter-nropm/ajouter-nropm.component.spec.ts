import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterNropmComponent } from './ajouter-nropm.component';

describe('AjouterNropmComponent', () => {
  let component: AjouterNropmComponent;
  let fixture: ComponentFixture<AjouterNropmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterNropmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterNropmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
