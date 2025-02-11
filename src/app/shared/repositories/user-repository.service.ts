import { Injectable } from '@angular/core';
import { BaseRepositoryService } from '../../core/bases/base-repository.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService extends BaseRepositoryService<User> {
  protected override resource: string = 'user';
}
