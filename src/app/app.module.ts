import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './components/settings/settings.component';
import { HuntComponent } from './components/hunt/hunt.component';
import { FarmComponent } from './components/farm/farm.component';
import { WorkComponent } from './components/work/work.component';
import { TrainComponent } from './components/train/train.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import { TimerComponent } from './components/timer/timer.component';
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzGridModule} from "ng-zorro-antd/grid";
import { AlarmComponent } from './components/alarm/alarm.component';
import {NzModalModule} from "ng-zorro-antd/modal";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    HuntComponent,
    FarmComponent,
    WorkComponent,
    TrainComponent,
    TimerComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDividerModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzProgressModule,
    NzGridModule,
    NzModalModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
