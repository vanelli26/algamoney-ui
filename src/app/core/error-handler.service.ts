import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente mais tarde.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: 'AlgaMoney', detail: msg});
  }
}
