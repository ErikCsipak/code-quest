import { Component, OnInit } from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';

@Component({
  selector: 'estimation-form',
  templateUrl: './estimation-form.component.html',
  styleUrls: ['./estimation-form.component.scss']
})
export class EstimationFormComponent implements OnInit {
  explanation: any;
  estimatedTime: any;
  loading = true;

  constructor(private sharedDataService: SharedEstimationDataService) {
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      if (data) {
        this.explanation = data.explanation;
        this.estimatedTime = data.estimatedTimeSpent
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }

}
