import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { EstimationFormModule } from '../estimation-form/estimation-form.module';
import { VerticalAccordionModule } from '../vertical-accordion/vertical-accordion.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    EstimationFormModule,
    VerticalAccordionModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
