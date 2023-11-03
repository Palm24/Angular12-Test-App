import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app-material.module';

import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

import { InputDetailComponent } from './input-detail/input-detail.component';
import { ReviewConfirmComponent } from './review-confirm/review-confirm.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    InputDetailComponent,
    ReviewConfirmComponent
  ],
})
export class DashboardModule { }
