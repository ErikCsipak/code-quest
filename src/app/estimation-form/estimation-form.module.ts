import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationFormComponent } from './estimation-form.component';
import { VerticalAccordionModule } from '../vertical-accordion/vertical-accordion.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EstimationFormComponent
  ],
  imports: [
    CommonModule,
    VerticalAccordionModule,
    FormsModule
  ],
  exports: [
    EstimationFormComponent
  ]
})
export class EstimationFormModule { }
