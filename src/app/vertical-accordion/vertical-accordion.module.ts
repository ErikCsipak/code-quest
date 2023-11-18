import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalAccordionComponent } from './vertical-accordion.component';
import { ChatBoxModule } from '../chat-box/chat-box.module';
import { NbAccordionModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';



@NgModule({
  declarations: [
    VerticalAccordionComponent
  ],
  imports: [
    CommonModule,
    ChatBoxModule,
    NbAccordionModule,
    NbLayoutModule,
    NbSidebarModule
  ],
  exports: [
    VerticalAccordionComponent
  ]
})
export class VerticalAccordionModule { }
