import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {SharedIssueKeyService} from "./services/shared.issue.key.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private location: Location,  private issueKeyService: SharedIssueKeyService) {}
  issue: any = '';
  ngOnInit() {
    const path = this.location.path();
    this.issue = {'issueKey': path.split('/').pop()};
    this.issueKeyService.setData(this.issue);
  }
}
