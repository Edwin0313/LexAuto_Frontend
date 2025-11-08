import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes de PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog'; // ⬅️ Nuevo: Importamos el módulo de diálogo

// Componente del formulario y Modelos
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoForm } from '../vehiculo-form/vehiculo-form';
import { VehiculoService } from '../../services/vehiculo.service';
@Component({
  selector: 'app-listar-vehiculo',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DialogModule,
    VehiculoForm
  ],
  templateUrl: './listar-vehiculo.html',
  styleUrl: './listar-vehiculo.scss',
  providers: [],
})
export class ListarVehiculo implements OnInit {

  // -------------------- ESTADOS DEL LISTADO --------------------
  vehiculos: Vehiculo[] = [];
  loading: boolean = true;
  globalFilter: string = '';

  // -------------------- ESTADOS DEL MODAL --------------------
  displayVehiculoModal: boolean = false; // ⬅️ Controla la visibilidad del modal
  vehiculoSeleccionado: Vehiculo | null = null; // ⬅️ Vehículo a editar (o null para crear)

  cols = [
    { field: 'placa', header: 'Placa' },
    { field: 'marca', header: 'Marca' },
    { field: 'modelo', header: 'Modelo' },
    { field: 'anio', header: 'Año' },
    { field: 'precio', header: 'Precio' }
  ];

  constructor(private readonly vehiculoService: VehiculoService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cargarVehiculos();
  }

  // Carga los datos de la tabla
  cargarVehiculos() {
    this.loading = true;
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.loading = false;
        this.cdr.detectChanges(); // 3. Notifica a Angular que detecte los cambios

      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
        this.loading = false;
        this.cdr.detectChanges(); // También es buena idea hacerlo en el caso de error

      }
    });
  }

  /**
   * Abre el modal de creación o edición.
   * @param vehiculo Opcional. Si existe, abre en modo edición.
   */
  abrirFormulario(vehiculo?: Vehiculo) {
    this.vehiculoSeleccionado = vehiculo || null; // Setea el vehículo a editar o null
    this.displayVehiculoModal = true; // Abre el modal
  }

  /**
   * Cierra el modal y refresca la lista si se guardó algo.
   * Este método es llamado por el evento (onSaveOrCancel) del formulario hijo.
   */
  cerrarModal(recargar: boolean = false) {
    this.displayVehiculoModal = false;
    this.vehiculoSeleccionado = null;
    if (recargar) {
      this.cargarVehiculos(); // Recarga la lista si se guardó un vehículo
    }
  }

  // TODO: Agregar lógica de borrado real
  eliminarVehiculo(vehiculo: Vehiculo) {
    console.log('Eliminando vehículo:', vehiculo.placa);
    // Aquí iría la lógica de confirmación y llamada al servicio de borrado
  }

}
