import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TagModule, ToolbarModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss'],
})
export class Clientes {
  clientes: any[] = [];

  constructor() {
    // Ejemplo de datos de clientes
    this.clientes = [
      { idCliente: 1, rucCliente: '12345678901', nombreCliente: 'Cliente A', correoCliente: 'clienteA@example.com', tipoPersonaCliente: 'natural', nacionalidadCliente: 'ecuatoriana', esPEP: true, consentimientoLOPDP: false },
      { idCliente: 2, rucCliente: '10987654321', nombreCliente: 'Cliente B', correoCliente: 'clienteB@example.com', tipoPersonaCliente: 'juridica', nacionalidadCliente: 'ecuadoriana', esPEP: false, consentimientoLOPDP: false },
      { idCliente: 3, rucCliente: '11223344556', nombreCliente: 'Cliente C', correoCliente: 'clienteC@example.com', tipoPersonaCliente: 'natural', nacionalidadCliente: 'ecuadoriana', esPEP: true, consentimientoLOPDP: true },
    ];
  }

}
