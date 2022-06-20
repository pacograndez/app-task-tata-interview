import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CoreService } from './core/core.service';
import { TaskService } from './task/task.service';

@NgModule({
  providers: [CoreService, AuthService, TaskService],
})
export class ServiceModule {}
