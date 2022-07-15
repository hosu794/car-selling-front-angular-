import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  alertService: AlertService;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string | null = null

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, alertService: AlertService) {
    this.alertService = alertService;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) return

    this.loading = true;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(first()).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = "Incorect login credentials"
      this.loading = false;
    })

  }

}
