import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DELAY } from '../../../shared/interceptor/delay-interceptor.service';
import { IResponse } from '../../../shared/models/response.model';
import { AuthService } from '../../../shared/service/auth/auth.service';
import { TaskService } from '../../../shared/service/task/task.service';
import { IUser } from '../../auth/models/user.model';
import { ITask } from '../models/taks.model';

const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  fTask: FormGroup;
  tasks: ITask[] = [];
  user: IUser;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser.subscribe((res: IUser) => {
        this.user = res ? res : JSON.parse(localStorage.getItem('user'));
        this.taskService.currentTasks.subscribe((res: ITask[]) => {
          this.tasks =
            res && res.length > 0
              ? res
              : JSON.parse(localStorage.getItem('tasks'));
          if (!this.tasks) {
            this.getListTask(this.user.uuid);
          } else {
            this.spinner.hide();
          }
        });
      })
    );
    this.initialForm();
  }

  initialForm(): void {
    this.fTask = this.formBuilder.group({
      uuid: [''],
      userUuid: [''],
      name: ['', Validators.required],
      check: [''],
    });
  }

  getListTask(uuid: string): void {
    this.spinner.show();
    this.subscription.add(
      this.taskService.listTask(uuid).subscribe((res: IResponse) => {
        if (!res.error) {
          this.spinner.hide();
          this.tasks = res.data;
          this.taskService.setCurrentTasks(this.tasks);
        }
      })
    );
  }

  submit(): void {
    if (this.fTask.valid) {
      this.fTask.controls['uuid'].setValue(uuid());
      this.fTask.controls['check'].setValue(false);
      this.fTask.controls['userUuid'].setValue(this.user.uuid);
      this.addTask(this.fTask.getRawValue());
    }
  }

  addTask(task: ITask): void {
    this.spinner.show();
    this.subscription.add(
      this.taskService
        .createTask(this.tasks, task)
        .subscribe((res: IResponse) => {
          if (!res.error) {
            this.spinner.hide();
            this.toastService.success(res.message);
            this.tasks = res.data;
            this.taskService.setCurrentTasks(this.tasks);
            this.fTask.reset();
          }
        })
    );
  }

  deleteTask(event: ITask): void {
    this.spinner.show();
    this.subscription.add(
      this.taskService
        .deleteTask(this.tasks, event.uuid)
        .subscribe((res: IResponse) => {
          if (!res.error) {
            this.spinner.hide();
            this.toastService.success(res.message);
            this.tasks = res.data;
            this.taskService.setCurrentTasks(this.tasks);
          }
        })
    );
  }

  logout(): void {
    this.spinner.show();
    this.subscription.add(
      this.authService.logout().subscribe((res: IResponse) => {
        if (!res.error) {
          this.spinner.hide();
          localStorage.clear();
          this.router.navigate(['auth/login'], { replaceUrl: true });
          this.toastService.info(res.message);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
