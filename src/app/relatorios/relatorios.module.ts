import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RelatoriosRoutingModule,

    CalendarModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
