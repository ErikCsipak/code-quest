import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  isSidebarActive: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  messages: any[] = [
    {
      text: 'Hi! Ask me anything about the estimation, or it\'s details!',
      date: new Date(),
      reply: false,
      user: {
        name: 'Minera',
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
    this.httpClient.post('http://localhost:3000/chat', { message: event.message }).subscribe(
      (data: any) => {
        this.messages.push({
          text: data.message,
          date: new Date(),
          reply: false,
          user: {
            name: 'Minera'
          },
        });
      }
    );
  }
}
