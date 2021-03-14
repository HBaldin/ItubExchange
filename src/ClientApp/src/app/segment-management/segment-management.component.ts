import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertConfig } from '../shared/models/alert-config.model';
import { Segment } from '../shared/models/segment.model';
import { SegmentService } from '../shared/services/segment.service';

@Component({
  selector: 'app-segment-management',
  templateUrl: './segment-management.component.html',
  styleUrls: ['./segment-management.component.scss']
})
export class SegmentManagementComponent implements OnInit {
  alertConfig: AlertConfig;
  segments: Segment[];
  segmentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private segmentService: SegmentService) { }

  ngOnInit(): void {
    this.segmentForm = this.fb.group({
      segmentName: new FormControl('', Validators.required),
      segmentTax: new FormControl('', [Validators.required, Validators.min(0)])
    });

    //Popula a tabela de segmentos
    this.populateSegmentsGrid();
  }

  populateSegmentsGrid() {
    this.segmentService.getSegments().subscribe(
      data => {
        this.segments = data;
      },
      errors => {
        this.alertConfig = {
          alertMessage: errors,
          alertClass: "danger"
        };
      });
  }

  addNewSegment() {
    let form = this.segmentForm.value;

    let newSegmentRequest = new Segment();
    newSegmentRequest.name = form.segmentName;
    newSegmentRequest.exchangeTax = form.segmentTax;

    this.segmentService.addSegment(newSegmentRequest).subscribe(
      response => {
        this.segments.push(response);
        this.alertConfig = {
          alertClass: 'success',
          alertMessage: 'Segmento cadastrado com sucesso'
        };
      },
      error => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: error
        }
      }
    );
  }

  deleteSegment(segmentId: string) {
    this.segmentService.deleteSegment(segmentId).subscribe(
      response => {
        this.segments = this.segments.filter(s => s.id !== segmentId);
        this.alertConfig = {
          alertClass: 'success',
          alertMessage: 'Segmento removido com sucesso'
        }
      }
    )
  }
}