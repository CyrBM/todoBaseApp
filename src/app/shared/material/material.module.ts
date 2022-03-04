import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
