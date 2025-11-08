// src/app/features/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

const API_CLIENTES = 'http://api.midominio.com/v1/clientes';

@Injectable({
    providedIn: 'root' // Disponible para toda la app (o 'providedIn: ClienteFeatureModule' si fuera modular)
})
export class ClienteService {
    constructor(private readonly http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(API_CLIENTES);
    }

    crearCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(API_CLIENTES, cliente);
    }
}