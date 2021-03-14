import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../shared/models/currency.model';
import { Segment } from '../shared/models/segment.model';
import { CurrencyService } from '../shared/services/currency.service';
import { ExchangeService } from '../shared/services/exchange.service';
import { SegmentService } from '../shared/services/segment.service';
import { ExchangeRequest } from '../shared/services/DTOs/exchange-request.model';
import { ExchangeResult } from '../shared/models/exchange-result.model';
import { AlertConfig } from '../shared/models/alert-config.model';

@Component({
  selector: 'app-exchange-currency',
  templateUrl: './exchange-currency.component.html',
  styleUrls: ['./exchange-currency.component.scss']
})
export class ExchangeCurrencyComponent implements OnInit {
  alertConfig: AlertConfig;
  segments: Segment[];
  currencies: Currency[];
  exchangeForm: FormGroup;
  exchangeResult: ExchangeResult;

  constructor(private fb: FormBuilder,
    private exchangeService: ExchangeService,
    private segmentService: SegmentService,
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
    //Inicia o formulário
    this.exchangeForm = this.fb.group({
      segment: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

    //Recupera a lista de segmentos disponíveis
    this.populateSegments();

    //Recupera a lista de moedas disponíveis para conversão
    this.populateCurrencies();
  }

  populateSegments() {
    this.segmentService.getSegments().subscribe(
      data => {
        this.segments = data;
      },
      errors => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: errors
        }
      });
  }

  populateCurrencies() {
    this.currencyService.getCurrencies().subscribe(
      data => {
        this.currencies = data;
      },
      errors => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: errors
        }
      });
  }

  calculateExchangeValue() {
    var form = this.exchangeForm.value;

    let exchangeRequest: ExchangeRequest =
    {
      segmentId: form.segment,
      currencyId: form.currency,
      quantity: form.quantity
    };

    this.exchangeService.getExchangeValue(exchangeRequest).subscribe(
      data => {
        this.exchangeResult = new ExchangeResult();
        this.exchangeResult.currencyCode = this.currencies.find(c => c.id == form.currency).code;
        this.exchangeResult.value = data;
      },
      error => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: error
        }
      });
  }
}