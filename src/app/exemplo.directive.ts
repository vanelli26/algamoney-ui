import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appExemplo]',
  exportAs: 'campoColorido'
})
export class ExemploDirective {

  @HostBinding('style.backgroundColor') corDeFundo: string;
  @Input() cor = 'gray';
  constructor(
  ) {}

  @HostListener('focus') colorir() {
    this.corDeFundo = this.cor;
  }

  @HostListener('blur') descolorir() {
    this.corDeFundo = 'transparent';
  }
}
