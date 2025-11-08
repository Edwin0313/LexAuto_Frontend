export interface Cliente {
    actividadEconomica: string;
    cedulaRuc: string;
    correoElectronico: string;
    direccion: string;
    egresosMensuales: number;
    estadoCivil: number;
    fechaNacimiento: string | Date;
    idCliente: number;
    ingresosMensuales: number;
    lugarNacimiento: string;
    nacionalidad: string;
    nombreCompleto: string;
    origenLicitoFondos: boolean;
    personaPep: boolean;
    telefono: string;
    tipoCliente: number;
    totalActivos: number;
    totalPasivos: number;
}