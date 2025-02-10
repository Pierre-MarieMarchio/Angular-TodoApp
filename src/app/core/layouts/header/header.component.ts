import { Component, inject, resource } from '@angular/core';
import { PrimaryButtonComponent } from '../../ui/primary-button/primary-button.component';
import { BaseRepository } from '../../common/baseRepository.repository';
import { User } from '../../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'layout-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  test = inject(BaseRepository);

  users = resource({
    loader: async () => await firstValueFrom(this.test.getObservable<User[]>('user')),
  });

  


  showButtonClick() {

    console.log('clicked');
    this.users.reload();
    console.log(this.users.value());
  }
}
