/**
 * @author mickael
 * @description Ensemble des requetes pour la récupérer les données heure/heure
 *
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CONFIG } from '../../../../../../config';
import { Record } from '../../../../../_model/record';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataRange } from './data-range';
import { MyDate } from '../../../../../class/MyDate';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public recArray: Record[];
  public recordObs: Observable<Record[]>;
  public loading: boolean;
  private recArrrayTint: any[];
  private recArrayText: any[];
  private recArrayWeight: any[];
  private recArrayDateExt: any[];
  private recArrayDateInt: any[];
  private recArrayHint: any[];
  private recArrayHext: any[];
  private recArrayBatteryInt: any[];
  private recArrayBatteryExt: any[];
  public mergeOptionHourly: any = null;
  public currentIdHive: string;
  private templateSerie: any;
  public mergeOptionStack: any = null;

  constructor(private http: HttpClient) {
    this.currentIdHive = null;
    this.loading = false;
    this.templateSerie = {
      tInt: {
        name: 'Tint',
        type: 'line',
        showSymbol: false,
        data: []
      },
      tExt: {
        name: 'Text',
        type: 'line',
        showSymbol: false,
        data: []
      },
      hInt: {
        name: 'Hint',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        showSymbol: false,
        data: []
      },
      hExt: {
        name: 'Hext',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        showSymbol: false,
        data: []
      },
      bInt: {
        name: 'Batery-int',
        type: 'bar',
        xAxisIndex: 2,
        yAxisIndex: 2,
        showSymbol: false,
        color: 'red',
        large: true,
        largeThreshold: 10,
        barGap: '30%',
        data: []
      },
      bExt: {
        name: 'Batery-ext',
        type: 'bar',
        xAxisIndex: 2,
        yAxisIndex: 2,
        showSymbol: false,
        color: 'blue',
        large: true,
        largeThreshold: 10,
        barGap: '30%',
        data: []
      }
    };
  }

  /**
   *
   *
   * @param {string} idHive
   * @param {Date[]} [range]
   * @memberof RecordService
   * @return {void}
   */
  getRecordByIdHive(idHive: string, range?: Date[]): void {
    this.loading = false;
    this.currentIdHive = idHive;
    this.recArray = [];
    this.recordObs = this.http.post<Record[]>(CONFIG.URL + 'records/hive/' + idHive, range, httpOptions );
    this.recordObs.subscribe(
      (data) => {
        this.recArray = data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        if (this.recArray.length > 0) {
          this.mapRecord();
          this.updateMerge();
          this.templateSerie.tInt.data = this.recArrrayTint;
          this.mergeOptionStack.series.push(this.templateSerie.tInt);
          this.mergeOptionStack.series.push({data : this.recArrayText });
          this.mergeOptionStack.series.push({data : this.recArrayHint });
          this.mergeOptionStack.series.push({data : this.recArrayHext });
          this.mergeOptionStack.series.push({data : this.recArrayBatteryInt });
          this.mergeOptionStack.series.push({data : this.recArrayBatteryExt });
          this.loading = !this.loading;
        }
      }
    );
  }


  /**
   *
   *
   * @param {DataRange} scale
   * @param {string} idHive
   * @memberof RecordService
   * @deprecated 'A modifier'
   */
  setRange(scale: DataRange, idHive: string): void {
    let date;
    if (scale.type == 'DAY') {
      date = new Date();
      date.setDate((new Date().getDate() - scale.scale));
    } else {
      date = new Date();
      date.setMonth((new Date().getMonth() - scale.scale));
    }
    this.getRecordByIdHive(idHive, MyDate.getRange(date));
  }

  /**
   *
   *
   * @memberof RecordService
   */
  updateMerge(): void {
    this.mergeOptionHourly = {
      series: [
        {
          data : this.recArrayWeight
        },
        {
          data : this.recArrrayTint
        },
        {
          data : this.recArrayText
        }
      ]
    };
    this.mergeOptionStack = {
      series: []
    };
  }
  mapRecord() {
    this.recArrrayTint = [];
    this.recArrayText = [];
    this.recArrayDateInt = [];
    this.recArrayWeight = [];
    this.recArrayDateExt = [];
    this.recArrayBatteryExt = [];
    this.recArrayBatteryInt = [];
    this.recArrayHext = [];
    this.recArrayHint = [];
    this.recArray.forEach((element, index) => {
      if (element.temp_ext != null) {
        this.recArrayText.push({name : element.recordDate, value : [
          element.recordDate , element.temp_ext
        ]});
        this.recArrayWeight.push({name : element.recordDate, value :[
          element.recordDate, element.weight
        ]});
        this.recArrayBatteryExt.push({name : element.recordDate, value : [
          element.recordDate, element.battery_ext
        ]});
        this.recArrayHext.push({name : element.recordDate, value : [
          element.recordDate , element.humidity_ext
        ]});
       // this.recArrayDateExt.push(element.recordDate,element.recordDate);
      } else if (element.temp_int != null){
        this.recArrrayTint.push({ name : element.recordDate, value : [
          element.recordDate, element.temp_int
        ]});
        this.recArrayBatteryInt.push({name : element.recordDate, value : [
          element.recordDate, element.battery_int
        ]});
        this.recArrayHint.push({name : element.recordDate, value : [
          element.recordDate , element.humidity_int
        ]});
        // this.recArrayDateInt.push(element.recordDate);
      }
    });
  }
}
