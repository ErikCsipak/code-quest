import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationFormComponent } from './estimation-form.component';
import { VerticalAccordionModule } from '../vertical-accordion/vertical-accordion.module';



@NgModule({
  declarations: [
    EstimationFormComponent
  ],
  imports: [
    CommonModule,
    VerticalAccordionModule
  ],
  exports: [
    EstimationFormComponent
  ]
})
export class EstimationFormModule { }
