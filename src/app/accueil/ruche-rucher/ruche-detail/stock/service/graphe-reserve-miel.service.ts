import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrapheReserveMielService {

  constructor() { }
  option = {
    title: {
        text: 'RESERVES MIEL'
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
      },
    toolbox: {
    },
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
        left: '3%',
        right: '4%',
        bottom: '18%',
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
