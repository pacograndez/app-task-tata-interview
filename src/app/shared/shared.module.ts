import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './service/service.module';
import { PatternDirective } from './directive/pattern.directive';

@NgModule({
  imports: [CommonModule, ServiceModule],
  declarations: [PatternDirective],
  exports: [ServiceModule, PatternDirective],
})
export class SharedModule {}
