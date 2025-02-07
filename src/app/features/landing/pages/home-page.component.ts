import { Component } from '@angular/core';
import { HomeSingnupComponent } from '../components/home-singnup.component';
import { HeaderComponent } from '../../../core/layouts/header/header.component';

@Component({
  selector: 'app-home-page',
  imports: [HomeSingnupComponent, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
