import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListarCliente } from './components/listar-cliente/listar-cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ListarCliente],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss'],
})
export class Clientes {

}
