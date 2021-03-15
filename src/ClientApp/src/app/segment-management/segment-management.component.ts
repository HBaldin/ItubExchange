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
  formInEditMode: boolean;

  constructor(private fb: FormBuilder,
    private segmentService: SegmentService) { }

  ngOnInit(): void {
    this.segmentForm = this.fb.group({
      segmentId: new FormControl(''),
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

  addOrUpdateSegment() {
    let form = this.segmentForm.value;

    let newSegmentRequest = new Segment();
    newSegmentRequest.name = form.segmentName;
    newSegmentRequest.exchangeTax = form.segmentTax;
    newSegmentRequest.id = form.segmentId;

    if (newSegmentRequest.id == "") {
      this.addNewSegment(newSegmentRequest);
    } else {
      this.updateSegment(newSegmentRequest);

    }
  }

  addNewSegment(segment: Segment) {
    this.segmentService.addSegment(segment).subscribe(
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
          alertMessage: 'Não foi possível cadastrar um novo segmento'
        }
      }
    );
  }

  updateSegment(segment: Segment) {
    this.segmentService.updateSegment(segment).subscribe(
      response => {
        //Atualiza o grid
        let existingSegment = this.segments.find(s => s.id === segment.id);
        existingSegment.exchangeTax = segment.exchangeTax;

        //Exibe o alerta
        this.alertConfig = {
          alertClass: 'success',
          alertMessage: 'Segmento atualizado com sucesso'
        };

        //Reseta o formulário
        this.resetForm();
      },
      error => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: error
        }
      }
    )
  }

  populateForm(segment: Segment) {
    this.segmentForm.patchValue({
      segmentName: segment.name,
      segmentTax: segment.exchangeTax,
      segmentId: segment.id
    });

    document.getElementById("addOrUpdatebutton").innerHTML = "Atualizar";

    this.formInEditMode = true;
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

  resetForm() {
    this.segmentForm.patchValue({
      segmentName: '',
      segmentTax: '',
      segmentId: ''
    });

    document.getElementById("addOrUpdatebutton").innerHTML = "Cadastrar";

    this.formInEditMode = false;
  }
}