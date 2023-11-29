import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { EstimationFormModule } from '../estimation-form/estimation-form.module';
import { VerticalAccordionModule } from '../vertical-accordion/vertical-accordion.module';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { DetailsModule } from '../details/details.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    EstimationFormModule,
    VerticalAccordionModule,
    ChatBoxModule,
    DetailsModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
