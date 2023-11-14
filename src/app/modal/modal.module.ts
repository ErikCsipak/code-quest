import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { EstimationFormModule } from '../estimation-form/estimation-form.module';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { ChatBoxModule } from '../chat-box/chat-box.module';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    EstimationFormModule,
    ChatBoxModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
