import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoggedGuard } from '../../shared/guard/logged.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthComponent, LoginComponent],
  providers: [LoggedGuard],
})
export class AuthModule {}
