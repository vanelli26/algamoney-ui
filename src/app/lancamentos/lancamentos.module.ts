import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';
import { LancamentoService } from './lancamento.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/api';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,

    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    ToastModule,

    SharedModule
  ],
  exports: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent
  ],
  providers: [
    LancamentoService,
    MessageService
  ]
})
export class LancamentosModule { }
