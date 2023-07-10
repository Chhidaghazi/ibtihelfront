import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NropmHistoriqueComponent } from './nropm-historique.component';

describe('NropmHistoriqueComponent', () => {
  let component: NropmHistoriqueComponent;
  let fixture: ComponentFixture<NropmHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NropmHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NropmHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
