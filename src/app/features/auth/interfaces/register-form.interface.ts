import { FormControl } from '@angular/forms';

export interface RegisterForm {
  email: FormControl<string>;
  password1: FormControl<string>;
  password2: FormControl<string>;
}
