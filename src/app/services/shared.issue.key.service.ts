import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedIssueKeyService {
    private issueKey: any;

    setData(data: any) {
        this.issueKey = data;
    }

    getData() {
      return this.issueKey;
    }
}
