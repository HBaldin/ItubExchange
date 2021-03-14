import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import { SegmentManagementComponent } from './segment-management/segment-management.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangeService } from './shared/services/exchange.service';
import { NgxCurrencyModule } from "ngx-currency";
import { CurrencyManagementComponent } from './currency-management/currency-management.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './shared/components/alert/alert.component';
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeCurrencyComponent,
    SegmentManagementComponent,
    SidebarMenuComponent,
    CurrencyManagementComponent,
    AlertComponent,
    OnlyNumbersDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
