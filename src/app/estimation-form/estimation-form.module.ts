import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationFormComponent } from './estimation-form.component';
import { VerticalAccordionModule } from '../vertical-accordion/vertical-accordion.module';
import { FormsModule } from '@angular/forms';
import {DetailsModule} from "../details/details.module";
import {ChatBoxModule} from "../chat-box/chat-box.module";



@NgModule({
  declarations: [
    EstimationFormComponent
  ],
  imports: [
    CommonModule,
    VerticalAccordionModule,
    FormsModule,
    DetailsModule,
    ChatBoxModule
  ],
  exports: [
    EstimationFormComponent
  ]
})
export class EstimationFormModule { }
