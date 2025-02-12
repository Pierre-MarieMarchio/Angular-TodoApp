import { CanActivateFn } from '@angular/router';
import { UserStateService } from '../../../shared/services/user-state.service';
import { inject } from '@angular/core';
import { NavigationService } from '../../../shared/services/navigation.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const userState = inject(UserStateService);
  const navigation = inject(NavigationService);

  if (!userState.isAuthenticated()) {
    navigation.landingPage();
    return false;
  }

  return true;
};
