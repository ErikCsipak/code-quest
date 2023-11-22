import { Component, OnInit } from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  explanation: any;
  estimatedTime: any;
  loading = true;

  constructor(private sharedDataService: SharedEstimationDataService) {
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      this.loading = data ? false : true;
    });
  }
}
