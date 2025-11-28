// src/app/features/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CatalogoGenerico } from '../../models/catalogo-generico';

const uri = `${environment.host_backend}/tipo-persona`;

@Injectable({
    providedIn: 'root'
})
export class TipoPersonaService {
    constructor(private readonly http: HttpClient) { }

    get(): Observable<CatalogoGenerico[]> {
        return this.http.get<CatalogoGenerico[]>(uri);
    }
}