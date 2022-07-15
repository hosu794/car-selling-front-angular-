import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  alertService: AlertService;
  authenticationService: AuthenticationService;
  userService: UserService;
  error: string | null = null

  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, authenticationService: AuthenticationService, alertService: AlertService, userService: UserService) {
    this.alertService = alertService;
    this.authenticationService = authenticationService;
    this.userService = userService;
  }

  get f() { return this.registerForm.controls }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.registerForm.invalid) { return }

    this.loading = true;
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(data => {
      this.alertService.success("Registration successfull", true);
      this.router.navigate(['/login'])
    }, error => {
      this.error = "Incorect credentials"
      this.loading = false;
    })
  }

  ngOnInit(): void {

  }

}
