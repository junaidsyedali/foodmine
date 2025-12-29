import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    TitleComponent,
    CommonModule,
    TextInputComponent,
    DefaultButtonComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get loginFC() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.userService
      .login({
        email: this.loginFC['email'].value,
        password: this.loginFC['password'].value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
