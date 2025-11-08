import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListarVehiculo } from './components/listar-vehiculo/listar-vehiculo';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, ListarVehiculo],
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.scss'],
})
export class Vehiculos {

}
