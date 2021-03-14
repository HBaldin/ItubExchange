import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Segment } from '../shared/models/segment.model';
import { SegmentService } from '../shared/services/segment.service';

@Component({
  selector: 'app-segment-management',
  templateUrl: './segment-management.component.html',
  styleUrls: ['./segment-management.component.scss']
})
export class SegmentManagementComponent implements OnInit {
  segments: Segment[];

  constructor(private fb: FormBuilder,
    private segmentService: SegmentService) { }

  ngOnInit(): void {
    this.segmentService.getSegments().subscribe(data => {
      this.segments = data;
    });
  }

}
