import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVehiculo } from './listar-vehiculo';

describe('ListarVehiculo', () => {
  let component: ListarVehiculo;
  let fixture: ComponentFixture<ListarVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
