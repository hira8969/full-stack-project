import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnDestroy {
  step = 1;
  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  email = '';
  countdown = 0;
  timer: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.emailForm = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
    this.otpForm = this.fb.group({ otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]] });
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  sendOtp() {
    if (this.emailForm.invalid) return;
    this.loading = true;
    this.email = this.emailForm.value.email;
    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.toastr.success('OTP sent to your email!');
        this.step = 2;
        this.loading = false;
        this.startCountdown();
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Email not found');
        this.loading = false;
      }
    });
  }

  startCountdown() {
    this.countdown = 60;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) clearInterval(this.timer);
    }, 1000);
  }

  verifyOtp() {
    if (this.otpForm.invalid) return;
    this.step = 3;
  }

  resetPassword() {
    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) { this.toastr.error('Passwords do not match'); return; }
    this.loading = true;
    this.authService.resetPassword(this.email, this.otpForm.value.otp, newPassword).subscribe({
      next: () => {
        this.toastr.success('Password reset successfully!');
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || 'Reset failed. Try again.');
        this.loading = false;
      }
    });
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }
}
