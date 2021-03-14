import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../shared/models/currency.model';
import { Segment } from '../shared/models/segment.model';
import { CurrencyService } from '../shared/services/currency.service';
import { ExchangeService } from '../shared/services/exchange.service';
import { SegmentService } from '../shared/services/segment.service';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";

@Component({
  selector: 'app-exchange-currency',
  templateUrl: './exchange-currency.component.html',
  styleUrls: ['./exchange-currency.component.scss']
})
export class ExchangeCurrencyComponent implements OnInit {
  segments: Segment[];
  currencies: Currency[];
  exchangeForm: FormGroup;
  cotacao: number;

  constructor(private fb: FormBuilder,
    private exchangeService: ExchangeService,
    private segmentService: SegmentService,
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
    //Inicia o formulário
    this.exchangeForm = this.fb.group({
      segment: new FormControl(''),
      currency: new FormControl(''),
      quantity: new FormControl('')
    });

    //Recupera a lista de segmentos disponíveis
    this.segmentService.getSegments().subscribe(data => {
      this.segments = data;
    });

    //Recupera a lista de moedas disponíveis para conversão
    this.currencyService.getCurrencies().subscribe(response => {
      this.currencies = response;
    });
  }

  calcularCotacao() {
    var form = this.exchangeForm.value;

    var exchangeRate = this.exchangeService.getExchangeRate(form.currency);
    var segmentTax = this.segments[form.segment].exchangeTax;
    var quantity = form.quantity;

    this.cotacao = (quantity * exchangeRate) * (1 + segmentTax);
  }
}
