import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'layout-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly navigate = inject(NavigationService);

  navigateToLoginPage() {
    this.navigate.loginPage();
  }

  navigateToHomePage() {
    this.navigate.landingPage();
  }

  
}
