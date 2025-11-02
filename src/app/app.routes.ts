import { Routes } from '@angular/router';
import { Inicio } from './Presentacion/inicio/inicio';

export const routes: Routes = [
    // Ruta Estándar
    {
        path: 'inicio',       // El segmento de la URL (ej: /inicio)
        component: Inicio // El componente Standalone a cargar
    },
    // Redirección (Ruta Raíz)
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full' // Asegura que solo se redirija si la URL está completamente vacía
    },
    // Carga Perezosa de un Componente Standalone solo cuando se navegue a esta ruta
    {
        path: 'clientes',
        loadComponent: () => import('./Presentacion/clientes/clientes')
            .then(m => m.Clientes)
    },
    // Carga Perezosa de un Componente Standalone solo cuando se navegue a esta ruta
    {
        path: 'vehiculos',
        loadComponent: () => import('./Presentacion/vehiculos/vehiculos')
            .then(m => m.Vehiculos)
    },
    // Carga Perezosa de un Componente Standalone solo cuando se navegue a esta ruta
    {
        path: 'contratos',
        loadComponent: () => import('./Presentacion/contratos/contratos')
            .then(m => m.Contratos)
    },
    // Carga Perezosa de un Componente Standalone solo cuando se navegue a esta ruta
    {
        path: 'reportes',
        loadComponent: () => import('./Presentacion/reportes/reportes')
            .then(m => m.Reportes)
    },
    // Carga Perezosa de un Componente Standalone solo cuando se navegue a esta ruta
    {
        path: 'capacitacion',
        loadComponent: () => import('./Presentacion/capacitacion/capacitacion')
            .then(m => m.Capacitacion)
    },
];
