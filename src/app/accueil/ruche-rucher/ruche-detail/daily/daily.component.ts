import { Component, OnInit } from '@angular/core';
import { CalendrierTempIntService } from './service/calendrier-temp-int.service';
import { ActivatedRoute } from '@angular/router';
import { DailyRecordService } from '../../../disposition-ruche/Service/dailyRecordService';
import { DailyRecordsWService } from '../service/daily-records-w.service';
import { RucheService } from '../../../disposition-ruche/Service/ruche.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  message="";
  rucheId;
  rucheName : string;

  constructor(public calendrierTempInt : CalendrierTempIntService, private activatedRoute : ActivatedRoute, 
    public dailyRecordThService : DailyRecordService,
    public dailyRecordWservice : DailyRecordsWService,
    private rucheService : RucheService) { }

  ngOnInit() {
    this.rucheId = this.activatedRoute.snapshot.params.id;
    console.log(this.rucheId);
    this.dailyRecordThService.getByIdHive(this.rucheId);
    this.dailyRecordWservice.getDailyRecordsWbyIdHive(this.rucheService.ruche.id);
  }

}
