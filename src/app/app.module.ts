import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollComponent } from './comp/scroll/scroll.component';

import { ObserveHashListDirective } from './directive/observe-hash-list.directive';
import { ObserveHashItemDirective } from './directive/observe-hash-item.directive';


@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    ObserveHashListDirective,
    ObserveHashItemDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScrollingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
