import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from './service/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signUpService: SignUpService,
    private readonly router: Router,
    private readonly toast: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', Validators.required],
      confirmationPassword: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
    });
  }

  onSignUp() {
    this.loading = true;

    const data = {
      name: this.form.get('name')?.value,
      firstname: this.form.get('firstname')?.value,
      credential: {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      },
      photos: [],
    };
    this.signUpService.signUp(data).subscribe(
      (data) => {
        this.loading = false;
        this.toast.success('Vous pouvez vous connecter', 'Utilisateur créé');
        this.router.navigate(['login']);
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmationPassword() {
    return this.form.get('confirmationPassword');
  }

  get firstname() {
    return this.form.get('firstname');
  }
  get name() {
    return this.form.get('name');
  }
}
