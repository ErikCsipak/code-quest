import {AfterViewInit, Component} from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';
import { EstimationService } from '../services/estimation.service';
import {SharedIssueKeyService} from "../services/shared.issue.key.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  constructor(private estimationService: EstimationService, private sharedDataService: SharedEstimationDataService, private issueKeyService: SharedIssueKeyService) {
  }

  ngAfterViewInit() {
    this.loadData(this.issueKeyService.getData());
  }

  loadData(issueKey: string) {
    this.estimationService.getPredictionForStoryByIssueKey(issueKey)
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
