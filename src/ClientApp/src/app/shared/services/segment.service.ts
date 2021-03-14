import { HttpClient } from '@angular/common/http';
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
}
