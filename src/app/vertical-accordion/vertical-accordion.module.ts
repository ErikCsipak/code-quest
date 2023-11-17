import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalAccordionComponent } from './vertical-accordion.component';
import { ChatBoxModule } from '../chat-box/chat-box.module';



@NgModule({
  declarations: [
    VerticalAccordionComponent
  ],
  imports: [
    CommonModule,
    ChatBoxModule
  ],
  exports: [
    VerticalAccordionComponent
  ]
})
export class VerticalAccordionModule { }
