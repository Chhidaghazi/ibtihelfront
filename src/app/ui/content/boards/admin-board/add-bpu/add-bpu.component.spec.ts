import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBpuComponent } from './add-bpu.component';

describe('AddBpuComponent', () => {
  let component: AddBpuComponent;
  let fixture: ComponentFixture<AddBpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBpuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
