import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ui-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  label = input<string>('');
  type = input<string>('button');
  textSize = input<string>('');
  height = input<string>('');
  width = input<string>('w-full');
  padding = input<string>('');
  onClick = output();
}
