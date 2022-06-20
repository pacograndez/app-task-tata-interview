import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask } from '../../../feature/page/models/taks.model';
import { IResponse } from '../../models/response.model';
import { CoreService } from '../core/core.service';

@Injectable()
export class TaskService {
  currentTasks: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

  constructor(private coreService: CoreService) {}

  listTask(userUuid: string): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.list).pipe(
      map((t: ITask[]) => {
        const response: IResponse = { error: false, message: '', data: [] };
        response.data = t.filter((t: ITask) => t.userUuid === userUuid);
        return response;
      })
    );
  }

  createTask(task: ITask[], add: ITask): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.list).pipe(
      map(() => {
        const response: IResponse = { error: false, message: '', data: [] };
        if (task.length > 0) {
          task.push(add);
        } else {
          task = [add];
        }
        response.message = 'Tarea registrada con éxito!';
        response.data = task;
        return response;
      })
    );
  }

  deleteTask(task: ITask[], uuid: string): Observable<IResponse> {
    return this.coreService.execGetJson(endpoint.list).pipe(
      map(() => {
        const response: IResponse = { error: false, message: '', data: [] };
        response.message = 'Se eliminó la tarea con éxito!';
        response.data = task.filter((t: ITask) => t.uuid !== uuid);
        return response;
      })
    );
  }

  setCurrentTasks(tasks: ITask[]) {
    this.currentTasks.next(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export enum endpoint {
  list = 'task/list.json',
}
