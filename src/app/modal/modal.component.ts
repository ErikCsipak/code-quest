import { Component, OnInit } from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';
import { EstimationService } from '../services/estimation.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  explanation: any;
  estimatedTime: any;
  loading = true;

  constructor(private estimationService: EstimationService, private sharedDataService: SharedEstimationDataService) {
  }

  ngOnInit() {
    this.sharedDataService.data$.subscribe((data) => {
      this.loading = data ? false : true;
    });
  }

  onOpenModal() {
    const summary = 'Summarise the workload of an employee'; //todo dynamic
    const description = 'On the line of the employee, the user can see the total planned workload for the employee. Replace magic numbers with constant. Fix mistakes regarding i18n\nCast dates to strings to avoid issues with timezones Fix date intervals on frontend\nDisplay summaries and style timeline Generate API'; //todo dynamic

    this.sharedDataService.setData(undefined);
    this.estimationService.getPredictionForStory(summary, description)
      .subscribe(
        (response) => {
          this.sharedDataService.setData(response);
        },
        (error) => {
          alert('An error occurred!')
        }
      );
  }
}
