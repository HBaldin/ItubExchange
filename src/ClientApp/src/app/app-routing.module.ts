import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyManagementComponent } from './currency-management/currency-management.component';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import { SegmentManagementComponent } from './segment-management/segment-management.component';

const routes: Routes = [
  { path: '',   redirectTo: '/exchange', pathMatch: 'full' },
  { path: 'exchange', component: ExchangeCurrencyComponent },
  { path: 'segment-management', component: SegmentManagementComponent },
  { path: 'currency-management', component: CurrencyManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
