import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertConfig } from '../shared/models/alert-config.model';
import { Currency } from '../shared/models/currency.model';
import { CurrencyService } from '../shared/services/currency.service';

@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.scss']
})
export class CurrencyManagementComponent implements OnInit {
  alertConfig: AlertConfig;
  currencyForm: FormGroup;
  currencies: Currency[];

  constructor(private fb: FormBuilder,
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currencyName: new FormControl(''),
      currencyCode: new FormControl('')
    });

    //Popula a tabela de moedas cadastradas
    this.populateCurrenciesGrid();
  }

  populateCurrenciesGrid() {

    this.currencyService.getCurrencies().subscribe(
      data => {
        this.currencies = data
      },
      errors => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: errors
        }
      });
  }

  addNewCurrency() {
    let form = this.currencyForm.value;

    let newCurrencyRequest = new Currency();
    newCurrencyRequest.name = form.currencyName;
    newCurrencyRequest.code = form.currencyCode;

    this.currencyService.addCurrency(newCurrencyRequest).subscribe(
      response => {
        this.currencies.push(response);
        this.alertConfig = {
          alertClass: 'success',
          alertMessage: 'Moeda cadastrada com sucesso'
        };
      },
      error => {
        this.alertConfig = {
          alertClass: 'danger',
          alertMessage: error.error
        }
      }
    );
  }

  deleteCurrency(currencyId: string) {
    this.currencyService.deleteCurrency(currencyId).subscribe(
      response => {
        this.currencies = this.currencies.filter(s => s.id !== currencyId);
        this.alertConfig = {
          alertClass: 'success',
          alertMessage: 'Moeda removida com sucesso'
        }
      }
    )
  }
}