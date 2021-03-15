import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Segment } from '../models/segment.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSegments(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.API_URL + '/Segment');
  }

  addSegment(segment: Segment): Observable<Segment> {
    segment.id = undefined;
    return this.http.post<Segment>(this.API_URL + '/Segment', segment);
  }

  updateSegment(segment: Segment) {
    return this.http.patch(this.API_URL + '/Segment', segment);
  }

  deleteSegment(segmentId: string) {
    let param = new HttpParams().set('id', segmentId);
    let options = { params: param };
    return this.http.delete(this.API_URL + '/Segment', options);
  }
}
