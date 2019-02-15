import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphHoneyService {

  option: any;
  constructor() {
    this.option = {
      title: {
          text: 'Stocke de miel',
          left: 'center',
          top:'-5'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend : {
          top:40
      },
      series : [],
      dataZoom: [
          /*{   
              show: true,
              realtime: true,
              start: 0,
              end: 100
          },*/
          {
              type: 'inside',
              show: true,
              realtime: true,
              start: 0,
              end: 100
          }
      ],
      grid: {
          left: '5%',
          right: '2%',
          top:70,
          bottom:0,
          containLabel: true
      },
      xAxis : [
          {
              type : 'time',
              splitLine: {
                  show: false
              },
              min : '2018-01-01T00:00:00.000+0000',
              max : '2018-12-31T00:00:00.000+0000'
          }
      ],
      yAxis :
          {
              name : 'Poids (kg)',
              type : 'value'
          }
  };
  }
}
