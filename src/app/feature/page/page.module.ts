import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { PageRoutingModule } from './page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGuard } from '../../shared/guard/user.guard';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [PageComponent, ListComponent],
  providers: [UserGuard],
})
export class PageModule {}
