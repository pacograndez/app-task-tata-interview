import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../../shared/guard/user.guard';
import { ListComponent } from './list/list.component';
import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      { path: 'list', component: ListComponent, canActivate: [UserGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
