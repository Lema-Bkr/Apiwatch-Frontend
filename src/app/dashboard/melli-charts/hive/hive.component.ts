import { Component, OnInit, Renderer2, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MelliChartsDateService } from '../service/melli-charts-date.service';
import { MelliChartsHiveService } from '../service/melli-charts-hive.service';
import { DailyManagerService } from './service/daily-manager.service';
import { HourlyManagerService } from './service/hourly-manager.service';

const HOURLY = 'HOURLY';
const DAILY = 'DAILY';

@Component({
  selector: 'app-hive',
  templateUrl: './hive.component.html',
  styleUrls: ['./hive.component.css']
})
export class HiveComponent implements OnInit, AfterViewInit {

  public typeData: Array<any>;
  private currentEltTypeDaily: HTMLElement;
  private currentEltTypeHourly: HTMLElement;
  private currentTypeDaily: any;
  private currentTypeHourly: Array<any>;
  constructor(private melliDate: MelliChartsDateService,
    private melliHive: MelliChartsHiveService,
    public dailyManager: DailyManagerService,
    public hourlyManager: HourlyManagerService,
    private renderer: Renderer2) {
    this.typeData = [
      { name: 'WINCOME', id: 'WINCOME_DAILY', type: 'DAILY', class: 'item-type active' },
      { name: 'TEMP_INT_MAX', id: 'TEMP_INT_MAX_DAILY', type: 'DAILY', class: 'item-type' },
      { name: 'TEMP_INT_MIN', id: 'TEMP_INT_MIN_DAILY', type: 'DAILY', class: 'item-type' },
      { name: 'HRIN', id: 'HRIN_DAILY', type: 'DAILY', class: 'item-type' },
      { name: 'BROOD', id: 'BROOD_DAILY', type: 'DAILY', class: 'item-type' },

      { name: 'WINCOME', id: 'WINCOME_HOURLY', type: 'HOURLY', class: 'item-type active' },
      { name: 'TEMP_INT', id: 'TEMP_INT_MAX_HOURLY', type: 'HOURLY', class: 'item-type' },
      { name: 'TEMP_INT_MAX', id: 'TEMP_INT_MAX_DAILY', type: 'DAILY', class: 'item-type' },
      { name: 'TEMP_INT_MIN', id: 'TEMP_INT_MIN_HOURLY', type: 'HOURLY', class: 'item-type' },
      { name: 'HRIN', id: 'HRIN_HOURLY', type: 'HOURLY', class: 'item-type' },
      { name: 'BAT', id: 'BAT_HOURLY', type: 'HOURLY', class: 'item-type' }
    ];
    this.currentTypeDaily = this.typeData[0];
    this.currentTypeHourly = new Array(this.typeData[5]);
  }

  ngOnInit() {
    // this.dailyManager.getWeightincome(this.melliHive.getHiveSelect().id, this.melliHive.getDailyChartInstance(), this.melliDate.getRangeForReqest());
  }


  ngAfterViewInit(): void {
    this.currentEltTypeDaily = document.getElementById(this.currentTypeDaily.id);
    this.currentEltTypeHourly = document.getElementById(this.currentTypeHourly[0].id);

  }

  /**
   *
   *
   * @memberof HiveComponent
   */
  loadDailyData(): void {
    switch (this.currentTypeDaily.name) {
      case 'WINCOME':
        this.dailyManager.getChartWeightincome(this.melliHive.getHiveSelect().id, this.melliHive.getDailyChartInstance(), this.melliDate.getRangeForReqest());
        break;
      case 'TEMP_INT_MAX':
        break;
      case 'TEMP_INT_MIN':
        break;
      case 'HRIN':
        this.hourlyManager.getChartHint(this.melliHive.getHiveSelect().id, this.melliHive.getDailyChartInstance(), this.melliDate.getRangeForReqest());
        break;
      case 'BROOD':
        break;
      default:
        break;
    }
  }

  loadHourlyData(): void {
    if (this.ifTypeHourlyContains('WINCOME')) {
      this.hourlyManager.getChartWeight(this.melliHive.getHiveSelect().id, this.melliHive.getHourlyChartInstance(), this.melliDate.getRangeForReqest());

    } if (this.ifTypeHourlyContains('TEMP_INT')) {
      this.hourlyManager.getChartTempInt(this.melliHive.getHiveSelect().id, this.melliHive.getHourlyChartInstance(), this.melliDate.getRangeForReqest());

    } if (this.ifTypeHourlyContains('TEMP_INT_MAX')) {

    } if (this.ifTypeHourlyContains('TEMP_INT_MIN')) {

    } if (this.ifTypeHourlyContains('HRIN')) {

    } if (this.ifTypeHourlyContains('BROOD')) {

    }
  }


  /**
   *
   *
   * @param {string} labelType
   * @returns {boolean}
   * @memberof HiveComponent
   */
  ifTypeHourlyContains(labelType: string): boolean {
    return this.currentTypeHourly.filter(_filter => _filter.name === labelType).length > 0;
  }

  /**
   *
   *
   * @param {*} type
   * @memberof HiveComponent
   */
  removeTypeHourly(type: any): void {
    const index = this.currentTypeHourly.map(_type => _type.id).indexOf(type.id);
    this.currentTypeHourly.splice(index, 1);
  }

  /**
   *
   *
   * @param {*} type
   * @memberof HiveComponent
   */
  setType(type: any): void {
    if (type.type === DAILY) {
      if (type.id !== this.currentTypeDaily.id) {
        this.renderer.removeClass(this.currentEltTypeDaily, 'active');
        this.currentEltTypeDaily = document.getElementById(type.id);
        this.currentTypeDaily = type;
        console.log(document.getElementById(type.id));
        this.renderer.addClass(this.currentEltTypeDaily, 'active');
        this.loadDailyData();
      }
    } else {
      this.currentEltTypeHourly = document.getElementById(type.id);
      if (!this.ifTypeHourlyContains(type.name)) {
        this.currentTypeHourly.push(type);
        this.renderer.addClass(this.currentEltTypeHourly, 'active');
        this.loadHourlyData();
      } else {
        this.renderer.removeClass(this.currentEltTypeHourly, 'active');
        this.removeTypeHourly(type);
      }
    }
    console.log(this.currentTypeHourly);
  }

  setRangeChart() {
    let options = this.melliHive.getDailyChartInstance().getOption();
    options.calendar[0].range = this.melliDate.getRangeForReqest();
    console.log(options);
    this.melliHive.getDailyChartInstance().clear();
    this.melliHive.getDailyChartInstance().setOption(options);
    this.loadHourlyData();
  }

  onDailyChartInit(event: any): void {
    this.melliHive.setDailyChartInstance(event);
    console.log(this.melliHive.getDailyChartInstance());
  }

  onHourlyChartInit(event: any) {
    this.melliHive.setHourlyChartInstnace(event);
  }

  /**
   *
   *
   * @param {string} type
   * @returns {Array<any>}
   * @memberof HiveComponent
   */
  getlabelByType(type: string): Array<any> {
    return this.typeData.filter(_filter => _filter.type === type);
  }

}
