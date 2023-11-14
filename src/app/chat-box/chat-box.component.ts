import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  isSidebarActive: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  messages: any[] = [
    {
      text: 'Hi! Ask me anything about the estimation, or it\'s details!',
      date: new Date(),
      reply: false,
      user: {
        name: 'cqAI',
      },
    },
  ];

  sendMessage(event: any) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'John Doe'
      },
    });
  }
}
