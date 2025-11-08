import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { NotificationService } from '../../../../core/services/notification';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './vehiculo-form.html',
  styleUrl: './vehiculo-form.scss',
})
export class VehiculoForm implements OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly vehiculoService = inject(VehiculoService);

  vehiculoForm!: FormGroup;

  // Recibe un vehículo para edición (si es nulo, es modo "Crear")
  // Asume que la interfaz Vehiculo tiene una propiedad 'id'.
  @Input() vehiculoExistente: Vehiculo & { id: number } | null = null;
  @Output() onSaveOrCancel = new EventEmitter<boolean>();

  constructor() {
    // Inicialización del formulario
    this.vehiculoForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      placa: ['', Validators.required],
      cilindraje: [null, [Validators.required, Validators.min(50)]],
      anio: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      color: ['', Validators.required],
      chasis: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      precio: [null, [Validators.required, Validators.min(0)]],
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cada vez que @Input() vehiculoExistente cambia
    if (changes['vehiculoExistente'] && this.vehiculoExistente) {
      // Modo Edición: Rellena el formulario con los datos del vehículo
      this.vehiculoForm.patchValue(this.vehiculoExistente);
      // Deshabilita todos los campos del formulario
      this.vehiculoForm.disable();
      // Habilita únicamente el campo 'precio'
      this.vehiculoForm.get('precio')?.enable();

    } else {
      // Modo Creación: Resetea el formulario a sus valores iniciales
      this.vehiculoForm.reset();
      this.vehiculoForm.enable();
    }
  }
  guardarVehiculo() {
    if (this.vehiculoForm.valid) {
      const data = this.vehiculoForm.value;

      if (this.vehiculoExistente) {
        const id = this.vehiculoExistente.id;
        this.vehiculoService.actualizarVehiculo(id, data).subscribe(
          {
            next: (data) => {
              if (data) {
                this.notificationService.showSuccess(`Vehículo ${this.vehiculoExistente?.placa} actualizado con éxito.`);
              }
              else {
                this.notificationService.showError('No se pudo actualizar el vehículo. Intente nuevamente.');
              }
            },
            error: (err) => {
              console.error('Error al actualizar vehículo:', err);
            },
            complete: () => {
              // Cerrar el modal o navegar después de guardar.
              this.vehiculoForm.reset();
              this.onSaveOrCancel.emit(true); // true indica que debe recargar la lista
            }
          }
        );
      } else {
        // MODO CREAR (POST)
        console.log('Creando nuevo vehículo.', data);
        this.vehiculoService.crearVehiculo(data).subscribe(
          {
            next: (data) => {
              if (data) {
                this.notificationService.showSuccess(`Vehículo ${data?.placa} creado con éxito.`);
              }
              else {
                this.notificationService.showError('No se pudo crear el vehículo. Intente nuevamente.');
              }
            },
            error: (err) => {
              console.error('Error al crear vehículo:', err);
            },
            complete: () => {
              // Cerrar el modal o navegar después de guardar.
              this.vehiculoForm.reset();
              this.onSaveOrCancel.emit(true); // true indica que debe recargar la lista
            }
          }
        );
      }
    } else {
      console.error('Formulario de Vehículo inválido.');
      this.vehiculoForm.markAllAsTouched();
    }
  }
  cancelar() {
    // Si tienes un botón de cancelar o quieres cerrarlo sin guardar:
    this.onSaveOrCancel.emit(false); // false indica que no debe recargar
  }
}
