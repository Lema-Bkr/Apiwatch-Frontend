import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MelliChartsComponent } from './melli-charts.component';
import { MelliChartsRouting } from './melli-charts.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HiveComponent } from './hive/hive.component';
import { RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { StackComponent } from './stack/stack.component';
import { VitalityComponent } from './vitality/vitality.component';
import { DailyManagerService } from './hive/service/daily-manager.service';
import { HourlyManagerService } from './hive/service/hourly-manager.service';

@NgModule({
  providers:[
    DailyManagerService,
    HourlyManagerService
  ],
  declarations: [
    MelliChartsComponent,
    HiveComponent,
    MapComponent,
    StackComponent,
    VitalityComponent
   ],
  imports: [
    MelliChartsRouting,
    SharedModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MelliChartsModule { }
