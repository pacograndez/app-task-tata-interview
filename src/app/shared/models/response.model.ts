import { IUser, IUserLogin } from '../../feature/auth/models/user.model';
import { ITask } from '../../feature/page/models/taks.model';

export interface IResponse {
  error: boolean;
  message: string;
  data: any | IUserLogin | IUser | ITask;
}
