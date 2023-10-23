import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const MaterialComponents=[
  MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,
  MatNativeDateModule,MatSelectModule,MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule
];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents],
})

export class MaterialModule { }
