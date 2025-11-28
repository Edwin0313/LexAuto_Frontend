// src/app/features/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatalogoGenerico } from '../../models/catalogo-generico';

const uri = `${environment.host_backend}/estado-civil`;

@Injectable({
    providedIn: 'root'
})
export class EstadoCivilService {
    constructor(private readonly http: HttpClient) { }

    get(): Observable<CatalogoGenerico[]> {
        return this.http.get<CatalogoGenerico[]>(uri);
    }
}