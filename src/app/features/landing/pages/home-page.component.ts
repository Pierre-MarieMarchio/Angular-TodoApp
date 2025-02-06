import { Component } from '@angular/core';
import { HomeSingnupComponent } from '../components/home-singnup/home-singnup.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-home-page',
  imports: [HomeSingnupComponent, PrimaryButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  showButtonClick() {
    console.log('clicked');
  }
}
