import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ClienteForm } from '../cliente-form/cliente-form';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ClienteForm,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './listar-cliente.html',
  styleUrl: './listar-cliente.scss',
})
export class ListarCliente implements OnInit {
  clientes: any[] = [];
  loading: boolean = true;
  globalFilter: string = '';

  // -------------------- ESTADOS DEL MODAL --------------------
  displayClienteModal: boolean = false; // ⬅️ Controla la visibilidad del modal
  clienteSeleccionado: any = null; // ⬅️ Cliente a editar (o null para crear)


  cols = [
    { field: 'rucCliente', header: 'RUC' },
    { field: 'nombreCliente', header: 'Nombre' },
    { field: 'correoCliente', header: 'Correo' },
    { field: 'tipoPersonaCliente', header: 'Tipo de Persona' },
    { field: 'nacionalidadCliente', header: 'Nacionalidad' },
    { field: 'esPEP', header: 'Es PEP' },
    { field: 'consentimientoLOPDP', header: 'Consentimiento LOPDP' }
  ];

  constructor() {
  }


  ngOnInit() {
    this.cargarClientes();
  }

  // Carga los datos de la tabla
  cargarClientes() {
    this.loading = true;
    // Ejemplo de datos de clientes
    this.clientes = [
      { idCliente: 1, rucCliente: '12345678901', nombreCliente: 'Cliente A', correoCliente: 'clienteA@example.com', tipoPersonaCliente: 'natural', nacionalidadCliente: 'ecuatoriana', esPEP: true, consentimientoLOPDP: false },
      { idCliente: 2, rucCliente: '10987654321', nombreCliente: 'Cliente B', correoCliente: 'clienteB@example.com', tipoPersonaCliente: 'juridica', nacionalidadCliente: 'ecuadoriana', esPEP: false, consentimientoLOPDP: false },
      { idCliente: 3, rucCliente: '11223344556', nombreCliente: 'Cliente C', correoCliente: 'clienteC@example.com', tipoPersonaCliente: 'natural', nacionalidadCliente: 'ecuadoriana', esPEP: true, consentimientoLOPDP: true },
    ];
    this.loading = false;
    // this.vehiculoService.getVehiculos().subscribe({
    //   next: (data) => {
    //     this.vehiculos = data;
    //     this.loading = false;
    //     this.cdr.detectChanges(); // 3. Notifica a Angular que detecte los cambios

    //   },
    //   error: (err) => {
    //     console.error('Error al cargar vehículos:', err);
    //     this.loading = false;
    //     this.cdr.detectChanges(); // También es buena idea hacerlo en el caso de error

    //   }
    // });
  }
  /**
     * Abre el modal de creación o edición.
     * @param cliente Opcional. Si existe, abre en modo edición.
     */
  abrirFormulario(cliente?: any) {
    this.clienteSeleccionado = cliente || null; // Setea el cliente a editar o null
    this.displayClienteModal = true; // Abre el modal
  }

  /**
   * Cierra el modal y refresca la lista si se guardó algo.
   * Este método es llamado por el evento (onSaveOrCancel) del formulario hijo.
   */
  cerrarModal(recargar: boolean = false) {
    this.displayClienteModal = false;
    this.clienteSeleccionado = null;
    if (recargar) {
      this.cargarClientes(); // Recarga la lista si se guardó un cliente
    }
  }

  // TODO: Agregar lógica de borrado real
  eliminarCliente(cliente: any) {
    console.log('Eliminando cliente:', cliente.nombreCliente);
    // Aquí iría la lógica de confirmación y llamada al servicio de borrado
  }
}
