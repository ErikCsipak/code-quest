import {AfterViewInit, Component} from '@angular/core';
import { SharedEstimationDataService } from '../services/shared.estimation.data.service';

@Component({
  selector: 'detail-canvas',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements AfterViewInit{
  similarIssues: any;
  filesToBeModified: any;
  subtasks: any;
  loading = true;

  constructor(private sharedDataService: SharedEstimationDataService) {
  }

  ngAfterViewInit () {
    this.sharedDataService.data$.subscribe((data) => {
      if (data) {
        this.similarIssues = data.similarIssues;
        this.filesToBeModified = data.filesToBeModified;
        this.subtasks = data.subtasks
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }

}
