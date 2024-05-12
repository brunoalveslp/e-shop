import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { Address } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

  complexPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$";

  address = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
  })

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email],[this.validateEmailNotTaken()]],
    roles: [['User']],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    address: this.address
  })

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error => this.errors = error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkIfEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true} : null),
            finalize(() => control.markAsTouched())
            )
        })
      )

    }
  }
}
