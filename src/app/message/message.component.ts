import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <p-message *ngIf="temErro()" severity="{{severity}}" text="{{text}}"></p-message>
  `,
  styles: []
})
export class MessageComponent {

  @Input() severity: string;
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
