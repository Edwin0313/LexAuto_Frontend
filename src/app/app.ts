import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
// Componentes de PrimeNG
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
// Opcional: Usamos PanelMenu para un menú anidado y estructurado
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,
    DrawerModule,
    ButtonModule,
    PanelMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('LexAuto.Web');
  // Estado que controla la visibilidad del sidebar
  sidebarVisible: boolean = false;
  menuItems!: MenuItem[]; // Arreglo para la estructura del menú

  ngOnInit(): void {
    // Initialization logic here
    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/inicio'], command: () => this.sidebarVisible = false },
      {
        label: 'Productos', icon: 'pi pi-box', items: [
          { label: 'Catálogo', icon: 'pi pi-list', routerLink: ['/productos/catalogo'], command: () => this.sidebarVisible = false },
          { label: 'Ofertas', icon: 'pi pi-tag', routerLink: ['/productos/ofertas'], command: () => this.sidebarVisible = false }
        ]
      },
      { label: 'Clientes', icon: 'pi pi-users', routerLink: ['/clientes'], command: () => this.sidebarVisible = false },
      { label: 'Vehículos', icon: 'pi pi-car', routerLink: ['/vehiculos'], command: () => this.sidebarVisible = false },
      { label: 'Contratos', icon: 'pi pi-file', routerLink: ['/contratos'], command: () => this.sidebarVisible = false },
      { label: 'Reportes', icon: 'pi pi-chart-line', routerLink: ['/reportes'], command: () => this.sidebarVisible = false },
      { label: 'Capacitación', icon: 'pi pi-book', routerLink: ['/capacitacion'], command: () => this.sidebarVisible = false }
    ];
  }
}
