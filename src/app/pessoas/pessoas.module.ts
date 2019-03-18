import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from './../shared/shared.module';
import { PessoasRountingModule } from './pessoas-routing.module';

@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    ButtonModule,

    SharedModule,
    PessoasRountingModule
  ],
  exports: []
})
export class PessoasModule { }
