import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresCompuestoPropioComponent } from './interes-compuesto-propio.component';

describe('InteresCompuestoPropioComponent', () => {
  let component: InteresCompuestoPropioComponent;
  let fixture: ComponentFixture<InteresCompuestoPropioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresCompuestoPropioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteresCompuestoPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
