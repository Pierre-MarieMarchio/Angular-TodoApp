import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';

@Component({
  selector: 'layout-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showButtonClick() {
    console.log('clicked');
  }
}
