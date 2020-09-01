import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { KnowledgesCountOfDay, KnowledgesStatusOfDay, ReviewListOfDay, ReadingActivityOfDay } from '../models/user-panel';

@Injectable({
  providedIn: 'root'
})
export class ReadingAnalyticService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getKnowledgesCount(): Observable<KnowledgesStatusOfDay[]> {
    return this.http.get<KnowledgesStatusOfDay[]>(this.baseUrl + 'api/ReadingAnalytic/GetKnowledgesCount');
  }
  getKnowledgesCountInMonth(): Observable<KnowledgesCountOfDay[]> {
    return this.http.get<KnowledgesCountOfDay[]>(this.baseUrl + 'api/ReadingAnalytic/GetKnowledgesCountInMonth');
  }
  getExpiringCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'api/ReadingAnalytic/GetExpiringCount');
  }
  getTodayReviewList(): Observable<ReviewListOfDay[]> {
    return this.http.get<ReviewListOfDay[]>(this.baseUrl + 'api/ReadingAnalytic/GetTodayReviewList');
  }
  getReadingActivityInDays(): Observable<ReadingActivityOfDay[]> {
    return this.http.get<ReadingActivityOfDay[]>(this.baseUrl + 'api/ReadingAnalytic/GetReadingActivityInDays');
  }
}
