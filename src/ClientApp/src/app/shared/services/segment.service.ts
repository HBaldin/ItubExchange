import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Segment } from '../models/segment.model';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  private readonly API_URL = 'https://localhost:5001';

  constructor(private http: HttpClient) { }

  getSegments(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.API_URL + '/Segment');
  }

  addSegment(newSegmentRequest: Segment): Observable<Segment> {
    return this.http.post<Segment>(this.API_URL + '/Segment', newSegmentRequest);
  }

  deleteSegment(segmentId: string) {
    let param = new HttpParams().set('id', segmentId);
    let options = { params: param };
    return this.http.delete(this.API_URL + '/Segment', options);
  }
}
