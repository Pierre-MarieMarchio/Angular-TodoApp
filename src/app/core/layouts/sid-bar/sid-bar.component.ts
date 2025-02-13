import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { AuthService } from '../../../features/auth/services/auth.service';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'layout-sid-bar',
  imports: [PrimaryButtonComponent],
  templateUrl: './sid-bar.component.html',
  styleUrl: './sid-bar.component.scss',
})
export class SidBarComponent {
  private readonly authService = inject(AuthService);
  private readonly navigate = inject(NavigationService);

  logOut() {
    this.authService.handleLogOut();
    this.navigate.landingPage();
  }
}
