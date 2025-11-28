import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ClienteService } from '../../services/cliente.service';
import { CatalogoGenerico } from '../../../../shared/models/catalogo-generico';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    InputMaskModule,
    DialogModule,
    InputNumberModule,
    DatePickerModule,
    SelectButtonModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.scss',
})
export class ClienteForm implements OnInit, OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly notificationService = inject(NotificationService);
  private readonly clienteService = inject(ClienteService);

  clienteForm!: FormGroup; // Define el FormGroup
  listadoTipoCliente: CatalogoGenerico[] = [];
  listadoActividadEconomica: CatalogoGenerico[] = [];
  listadoCanalContratacion: CatalogoGenerico[] = [];
  listadoNacionalidad: CatalogoGenerico[] = [];
  listadoEstadoCivil: CatalogoGenerico[] = [];
  listadoCondicionPep: CatalogoGenerico[] = [];
  listadoOrigenFondos: CatalogoGenerico[] = [];
  siNoOptions: { label: string; value: boolean; }[] = []; // Opciones para PEP / Origen de fondos

  // Recibe un cliente para edición (si es nulo, es modo "Crear")
  // Asume que la interfaz cliente tiene una propiedad 'id'.
  @Input() clienteExistente: any = null;
  @Output() saveOrCancel = new EventEmitter<boolean>();

  constructor() {
    this.siNoOptions = [
      { label: 'Sí', value: true },
      { label: 'No', value: false }
    ];
    // Inicializa el formulario reactivo
    this.clienteForm = this.fb.group({
      // --- Campos de Identificación ---
      documentoIdentificacion: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      ruc: [''], // Opcional o requerido según tu lógica
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required], // Este campo no está en el DTO, puede que necesites mapearlo o eliminarlo

      // --- IDs de Catálogos ---
      tipoPersonaId: [null, Validators.required],
      tipoIdentificacionId: [null, Validators.required], // Nuevo
      nacionalidadId: [null, Validators.required],
      parroquiaNacimientoId: [null, Validators.required], // Nuevo, reemplaza lugarNacimiento
      estadoCivilId: [null, Validators.required],
      actividadEconomicaId: [null, Validators.required],
      condicionPepId: [null, Validators.required], // Nuevo, reemplaza personaPep
      origenFondosId: [null, Validators.required], // Nuevo, reemplaza origenLicitoFondos
      canalContratacionId: [null, Validators.required],
      // IDs adicionales del DTO que podrías necesitar
      cumplimientoObligacionId: [null],
      listaControlId: [null],
      formaPagoPreferidaId: [null],
      reputacionId: [null],
      titularCuentaId: [null],
      montoTransaccionRangoId: [null],

      // --- Otros Campos ---
      direccion: ['', Validators.required], // No está en el DTO, considera si es necesario
      fechaNacimiento: [null, Validators.required],
      consentimientoLopdp: [true, Validators.required], // Nuevo

      // --- Campos Financieros ---
      ingresosMensuales: [0, [Validators.required, Validators.min(0)]],
      egresosMensuales: [0, [Validators.required, Validators.min(0)]],
      totalActivos: [0, [Validators.required, Validators.min(0)]],
      totalPasivos: [0, [Validators.required, Validators.min(0)]],
      patrimonio: [{ value: 0, disabled: true }],
    });
    this.suscribirListados();
    // Suscribirse a cambios en Activos y Pasivos para calcular Patrimonio
    this.clienteForm.get('totalActivos')?.valueChanges.subscribe(this.calcularPatrimonio.bind(this));
    this.clienteForm.get('totalPasivos')?.valueChanges.subscribe(this.calcularPatrimonio.bind(this));

  }
  suscribirListados() {
    this.clienteService.listadoTipoCliente$.subscribe(data => this.listadoTipoCliente = data);
    this.clienteService.listadoActividadEconomica$.subscribe(data => this.listadoActividadEconomica = data);
    this.clienteService.listadoCanalContratacion$.subscribe(data => this.listadoCanalContratacion = data);
    this.clienteService.listadoNacionalidad$.subscribe(data => this.listadoNacionalidad = data);
    this.clienteService.listadoEstadoCivil$.subscribe(data => this.listadoEstadoCivil = data);
    this.clienteService.listadoOrigenFondos$.subscribe(data => this.listadoOrigenFondos = data);
    this.clienteService.listadoCondicionPep$.subscribe(data => this.listadoCondicionPep = data);
  }
  ngOnInit(): void {
    this.obtenerDatosIniciales();
  }
  obtenerDatosIniciales() {
    this.clienteService.obtenerCatalogos().subscribe({
      error: (err) => {
        this.notificationService.showError('Error al cargar los catálogos iniciales.');
        console.error(err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Se ejecuta cada vez que @Input() clienteExistente cambia
    if (changes['clienteExistente'] && this.clienteExistente) {
      // Modo Edición: Rellena el formulario con los datos del cliente
      this.clienteForm.patchValue(this.clienteExistente);
      // Deshabilita todos los campos del formulario
      this.clienteForm.disable();
      // Habilita únicamente el campo 'precio'
      // this.clienteForm.get('precio')?.enable();

    } else {
      // Modo Creación: Resetea el formulario a sus valores iniciales
      this.clienteForm.reset();
      this.clienteForm.enable();
    }
  }
  calcularPatrimonio(): void {
    const activos = this.clienteForm.get('totalActivos')?.value || 0;
    const pasivos = this.clienteForm.get('totalPasivos')?.value || 0;
    const patrimonio = activos - pasivos;
    // Actualiza el valor del campo 'patrimonio'
    this.clienteForm.get('patrimonio')?.setValue(patrimonio, { emitEvent: false });
  }
  guardarCliente() {
    if (this.clienteForm.invalid) {
      this.notificationService.showError('El formulario es inválido. Por favor, revise los campos.');
      this.clienteForm.markAllAsTouched();
      return;
    }

    // 2. CONSTRUIR EL PAYLOAD con la estructura correcta
    const formValue = this.clienteForm.getRawValue(); // Usa getRawValue() para incluir campos deshabilitados
    const fecha: Date = formValue.fechaNacimiento;

    const clientePayload = {
      ...formValue, // Copia la mayoría de los campos que coinciden
      fechaNacimiento: { // Transforma el objeto Date
        year: fecha.getFullYear(),
        month: fecha.getMonth() + 1, // getMonth() es 0-indexado
        day: fecha.getDate(),
        dayOfWeek: fecha.getDay()
      },
      // Elimina campos que no existen en el DTO final
      telefono: undefined,
      direccion: undefined,
    };

    console.log('Enviando al backend:', clientePayload);

    // Lógica para crear o actualizar (descomentar y adaptar)
    /*
    if (this.clienteExistente) {
      // MODO ACTUALIZAR
      this.clienteService.actualizarCliente(this.clienteExistente.id, clientePayload).subscribe({
        next: () => {
          this.notificationService.showSuccess('Cliente actualizado con éxito.');
          this.saveOrCancel.emit(true);
        },
        error: (err) => this.notificationService.showError('Error al actualizar el cliente.')
      });
    } else {
      // MODO CREAR
      this.clienteService.crearCliente(clientePayload).subscribe({
        next: () => {
          this.notificationService.showSuccess('Cliente creado con éxito.');
          this.saveOrCancel.emit(true);
        },
        error: (err) => this.notificationService.showError('Error al crear el cliente.')
      });
    }
    */
  }
  cancelar() {
    // Si tienes un botón de cancelar o quieres cerrarlo sin guardar:
    this.saveOrCancel.emit(false); // false indica que no debe recargar
  }
}
