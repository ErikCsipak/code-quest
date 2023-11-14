import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box.component';
import { NbChatModule } from '@nebular/theme';



@NgModule({
  declarations: [
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    NbChatModule
  ],
  exports: [
    ChatBoxComponent
  ]
})
export class ChatBoxModule { }
