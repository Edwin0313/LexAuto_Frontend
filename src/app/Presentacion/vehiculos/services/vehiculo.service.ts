// src/app/features/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

const API_VEHICULOS = 'https://localhost:7283/api/vehiculo';

@Injectable({
    providedIn: 'root' // Disponible para toda la app (o 'providedIn: ClienteFeatureModule' si fuera modular)
})
export class VehiculoService {
    constructor(private readonly http: HttpClient) { }

    getVehiculos(): Observable<Vehiculo[]> {
        return this.http.get<Vehiculo[]>(API_VEHICULOS + '/vehiculo');
    }

    crearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
        return this.http.post<Vehiculo>(API_VEHICULOS + '/guardar', vehiculo);
    }
    actualizarVehiculo(id: number, vehiculo: Vehiculo): Observable<Vehiculo> {
        return this.http.put<Vehiculo>(`${API_VEHICULOS}/actualizar/${id}`, vehiculo);
    }
    eliminarVehiculo(id: number): Observable<void> {
        return this.http.delete<void>(`${API_VEHICULOS}/eliminar/${id}`);
    }
}