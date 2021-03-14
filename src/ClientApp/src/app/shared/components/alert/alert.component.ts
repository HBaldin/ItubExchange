import { Component, Input, OnInit } from '@angular/core';
import { AlertConfig } from '../../models/alert-config.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alertConfig: AlertConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
