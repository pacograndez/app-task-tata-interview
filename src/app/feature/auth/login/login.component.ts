import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IResponse } from '../../../shared/models/response.model';
import { AuthService } from '../../../shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  fLogin: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.initialForm();
  }

  initialForm(): void {
    this.fLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.fLogin.valid) {
      const { username, password } = this.fLogin.getRawValue();
      this.spinner.show();
      this.subscription.add(
        this.authService
          .login(username, password)
          .subscribe((login: IResponse) => {
            if (!login.error) {
              const { uuid } = login.data;
              this.authService.getUser(uuid).subscribe((user: IResponse) => {
                if (!user.error) {
                  this.spinner.hide();
                  this.authService.setCurrentUser(user.data);
                  this.router.navigate(['task/list'], { replaceUrl: true });
                } else {
                  this.toastService.error(user.message);
                }
              });
              this.toastService.info(login.message);
            } else {
              this.spinner.hide();
              this.toastService.error(login.message);
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
