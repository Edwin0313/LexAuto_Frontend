// src/app/features/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { ActividadEconomicaService } from '../../../shared/services/catalogos/actividad-economica.service';
import { CanalContratacionService } from '../../../shared/services/catalogos/canal-contratacion.service';
import { CatalogoGenerico } from '../../../shared/models/catalogo-generico';
import { TipoPersonaService } from '../../../shared/services/catalogos/tipo-persona.service';
import { NacionalidadService } from '../../../shared/services/catalogos/nacionalidad.service';
import { EstadoCivilService } from '../../../shared/services/catalogos/estado-civil.service';
import { OrigenFondosService } from '../../../shared/services/catalogos/origen-fondos.service';
import { CondicionPepService } from '../../../shared/services/catalogos/condicion-pep.service';

const API_CLIENTES = 'http://api.midominio.com/v1/clientes';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private listadoTipoClienteSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoTipoCliente$ = this.listadoTipoClienteSubject.asObservable();
    private listadoCanalContratacionSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoCanalContratacion$ = this.listadoCanalContratacionSubject.asObservable();
    private listadoActividadEconomicaSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoActividadEconomica$ = this.listadoActividadEconomicaSubject.asObservable();
    private listadoNacionalidadSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoNacionalidad$ = this.listadoNacionalidadSubject.asObservable();
    private listadoEstadoCivilSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoEstadoCivil$ = this.listadoEstadoCivilSubject.asObservable();
    private listadoOrigenFondosSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoOrigenFondos$ = this.listadoOrigenFondosSubject.asObservable();
    private listadoCondicionPepSubject = new BehaviorSubject<CatalogoGenerico[]>([]);
    listadoCondicionPep$ = this.listadoCondicionPepSubject.asObservable();

    constructor(private readonly http: HttpClient,
        private readonly actividadEconomicaService: ActividadEconomicaService,
        private readonly tipoPersonaService: TipoPersonaService,
        private readonly canalContratacionService: CanalContratacionService,
        private readonly nacionalidadService: NacionalidadService,
        private readonly estadoCivilService: EstadoCivilService,
        private readonly origenFondosService: OrigenFondosService,
        private readonly condicionPepService: CondicionPepService
    ) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(API_CLIENTES);
    }

    crearCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(API_CLIENTES, cliente);
    }
    obtenerCatalogos(): Observable<any> {
        return forkJoin({
            tiposPersona: this.tipoPersonaService.get(),
            actividades: this.actividadEconomicaService.get(),
            canales: this.canalContratacionService.get(),
            nacionalidades: this.nacionalidadService.get(),
            estadosCiviles: this.estadoCivilService.get(),
            origenesFondos: this.origenFondosService.get(),
            condicionesPep: this.condicionPepService.get()
        }).pipe(
            // Ahora 'resultados' es un objeto con las claves que definimos arriba
            tap((resultados) => {
                this.listadoTipoClienteSubject.next(resultados.tiposPersona);
                this.listadoActividadEconomicaSubject.next(resultados.actividades);
                this.listadoCanalContratacionSubject.next(resultados.canales);
                this.listadoNacionalidadSubject.next(resultados.nacionalidades);
                this.listadoEstadoCivilSubject.next(resultados.estadosCiviles);
                this.listadoOrigenFondosSubject.next(resultados.origenesFondos);
                this.listadoCondicionPepSubject.next(resultados.condicionesPep);
            })
        );
    }
}