import { Component } from '@angular/core';
import { HomeSingnupComponent } from "../home-singnup/home-singnup.component";


@Component({
  selector: 'app-home',
  imports: [HomeSingnupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
