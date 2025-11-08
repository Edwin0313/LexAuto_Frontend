import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    InputMaskModule,
    DialogModule,
    InputNumberModule,
    DatePickerModule,
    SelectButtonModule
  ],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.scss',
})
export class CrearCliente implements OnInit {
  @Input() mostrarCrearCliente: boolean = false; // Input para controlar la visibilidad del diálogo
  @Output() mostrarCrearClienteChange = new EventEmitter<boolean>();

  clienteForm!: FormGroup; // Define el FormGroup
  tipoClienteOptions: { label: string; value: number; }[] = [];
  estadoCivilOptions: { label: string; value: number; }[] = [];
  siNoOptions: { label: string; value: boolean; }[] = []; // Opciones para PEP / Origen de fondos

  constructor(private readonly fb: FormBuilder) { } // Inyecta FormBuilder

  ngOnInit() {
    this.tipoClienteOptions = [
      { label: 'Natural', value: 0 },
      { label: 'Jurídica', value: 1 }
    ];
    this.estadoCivilOptions = [
      { label: 'Soltero/a', value: 0 },
      { label: 'Casado/a', value: 1 },
      { label: 'Divorciado/a', value: 2 },
      { label: 'Viudo/a', value: 3 },
      { label: 'Unión Libre', value: 4 }
    ];

    this.siNoOptions = [
      { label: 'Sí', value: true },
      { label: 'No', value: false }
    ];
    // Inicializa el formulario reactivo
    this.clienteForm = this.fb.group({
      cedulaRuc: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipoCliente: [0, Validators.required],
      actividadEconomica: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      direccion: ['', Validators.required],
      // campos adicionales
      lugarNacimiento: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      ingresosMensuales: [0, [Validators.required, Validators.min(0)]],
      egresosMensuales: [0, [Validators.required, Validators.min(0)]],
      totalActivos: [0, [Validators.required, Validators.min(0)]],
      totalPasivos: [0, [Validators.required, Validators.min(0)]],
      patrimonio: [{ value: 0, disabled: true }], // Campo calculado, deshabilitado
      personaPep: [false, Validators.required],
      origenLicitoFondos: [true, Validators.required],
      estadoCivil: ['', Validators.required],
    });
    // Suscribirse a cambios en Activos y Pasivos para calcular Patrimonio
    this.clienteForm.get('totalActivos')?.valueChanges.subscribe(this.calcularPatrimonio.bind(this));
    this.clienteForm.get('totalPasivos')?.valueChanges.subscribe(this.calcularPatrimonio.bind(this));
  }
  calcularPatrimonio(): void {
    const activos = this.clienteForm.get('totalActivos')?.value || 0;
    const pasivos = this.clienteForm.get('totalPasivos')?.value || 0;
    const patrimonio = activos - pasivos;
    // Actualiza el valor del campo 'patrimonio'
    this.clienteForm.get('patrimonio')?.setValue(patrimonio, { emitEvent: false });
  }
  crearCliente() {
    // Lógica de creación de cliente
    console.log('Creando nuevo cliente:', this.clienteForm.value);
    this.cerrarDialogo();
  }
  cerrarDialogo() {
    this.mostrarCrearClienteChange.emit(false);
  }
}
