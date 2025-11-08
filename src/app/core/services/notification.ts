// src/app/core/services/notification.service.ts

import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly messageService = inject(MessageService);

  /**
   * Muestra un mensaje de éxito.
   * @param detail Mensaje específico de la acción.
   */
  showSuccess(detail: string = 'La operación se completó exitosamente.') {
    this.messageService.add({
      severity: 'success',
      summary: '¡Éxito!',
      detail: detail
    });
  }

  /**
   * Muestra un mensaje de error.
   * @param detail Mensaje específico del error.
   */
  showError(detail: string = 'Ha ocurrido un error inesperado.') {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail
    });
  }

  /**
   * Muestra un mensaje de advertencia.
   * @param detail Mensaje de advertencia.
   */
  showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: detail
    });
  }
}