import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { MaterialModule } from './material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SpinnerComponent, MaterialModule],
})
export class SharedModule {}
