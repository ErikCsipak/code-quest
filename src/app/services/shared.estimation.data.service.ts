import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedEstimationDataService {
    private dataSubject = new Subject<any>();
    public data$ = this.dataSubject.asObservable();

    setData(data: any) {
        this.dataSubject.next(data);
    }
}