import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../shared/models/currency.model';
import { CurrencyService } from '../shared/services/currency.service';

@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.scss']
})
export class CurrencyManagementComponent implements OnInit {
  currencyForm: FormGroup;
  currencies: Currency[];

  constructor(private fb: FormBuilder,
    private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currencyName: new FormControl(''),
      currencyCode: new FormControl('')
    });
    
    this.currencyService.getCurrencies().subscribe(data => {
      this.currencies = data
    });
  }

  addNewCurrency() {

  }
}