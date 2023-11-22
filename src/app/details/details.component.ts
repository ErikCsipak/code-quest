import { Component, OnInit } from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';

@Component({
  selector: 'detail-canvas',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  similarIssues: any;
  subtasks: any;
  loading = true;

  constructor(private sharedDataService: SharedEstimationDataService) {
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      if (data) {
        this.similarIssues = data.similarIssues;
        this.subtasks = data.subtasks
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }
  
}
