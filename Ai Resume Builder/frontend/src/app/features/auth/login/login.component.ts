import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatIconModule, MatCheckboxModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.authService.login({ email: this.form.value.email, password: this.form.value.password }).subscribe({
      next: (res: any) => {
        const role = res?.data?.role || res?.role || 'CANDIDATE';
        this.toastr.success('Welcome back!');
        if (role === 'ADMIN') this.router.navigate(['/dashboard/admin']);
        else if (role === 'RECRUITER') this.router.navigate(['/dashboard/recruiter']);
        else this.router.navigate(['/dashboard/overview']);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Invalid credentials. Please try again.');
        this.loading = false;
      }
    });
  }
}
