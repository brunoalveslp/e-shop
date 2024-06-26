import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

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
    roles: [["User"]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    address: this.address
  })

  onSubmit(){
    console.log(this.registerForm.value)
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
          this.router.navigateByUrl('/shop');
          this.toastr.success('Usuário registrado com sucesso!');
      },
      error: (error) => {
        this.errors = error.errors
        this.toastr.error(error.errors[0] || 'Erro ao registrar usuário!');
      }
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
