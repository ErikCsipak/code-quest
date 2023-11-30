import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EstimationService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getPredictionForStory(summary: string, description: string): Observable<any> {
        const requestBody = {
            Summary: summary,
            Description: description,
        };

        const postUrl = `${this.apiUrl}/predict`;

        return this.http.post(postUrl, requestBody);
    }
}