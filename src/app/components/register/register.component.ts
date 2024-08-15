import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, FormControl  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]]
    },{validators: this.checkPasswords})
  }  

  checkPasswords(control: AbstractControl) {
    const pass = control.get('password');
    const confirmPass = control.get('confirm_password');
    if (pass && confirmPass && pass.value !== confirmPass.value) {
      return { matchpassword: true };
    }
    return null;
  }

  onSubmit() {
    console.log("Entra al submit");
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      delete user.confirm_password;
      this.authService.register(user).subscribe({
        next: () => {
          alert('Successful registration');
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error(err);
          alert('An error occurred while registering');
        }
      });
    }
    else {
    alert('Please fix the errors in the form.');
  }
  }

  onReset() {
    this.registerForm.reset();
    this.router.navigate(['']);
  }
}
