import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Capacitacion } from './capacitacion';

describe('Capacitacion', () => {
  let component: Capacitacion;
  let fixture: ComponentFixture<Capacitacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capacitacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Capacitacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
