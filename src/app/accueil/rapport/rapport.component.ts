import { Component, OnInit, Input} from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { AnonymousSubscription } from "rxjs/Subscription";
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { RapportService } from './rapport.service';
import { Rucher } from '../ruche-rucher/rucher';
import { UserloggedService } from '../../userlogged.service';
import { RucherService } from '../ruche-rucher/rucher.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ProcessReport } from '../ruche-rucher/processedReport';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html'
})

export class RapportComponent implements OnInit {
   
  btnAnalyse: boolean;
  
  //variable to store ruchers
  ruchers: any [] = [];
  observationsNature : any[] = []; 
  observationsRuche : any[] = [];
  actionsApicole : any[] = [];  
  rapportForm : FormGroup;

  texteRapport ='';
  rapportAnalyse='';
  idApiary='xx';
  resultatRapport;
  selectedRucher = new Rucher();
  //variable for connected user
  username : string;
  x;
  currentRucherID;

  observations : ProcessReport[] = [];

  public errorMsg;

  private timerSubscription: AnonymousSubscription;


  //nomRuche;
    constructor(private formBuilder: FormBuilder,
                private http:HttpClient,
                private rapportService : RapportService,
                private data : UserloggedService,
                public rucherService : RucherService,
              ){  
                this.rapportForm=formBuilder.group({
                  'texte': [null,Validators.compose([Validators.required])],
                  
              })
    
        this.username= data.currentUser().username;
    }

    ngOnInit(){
      this.getUserRuchers();
      this.currentRucherID= localStorage.getItem("currentRucher");
      this.x=String(this.selectedRucher);
      this.x=this.currentRucherID;
      this.selectedRucher=this.x;
      this.btnAnalyse=true;
      
    }

    getUserRuchers(){
      this.rucherService.getUserRuchers(this.username).subscribe(
        data => { this.ruchers = data;},
        err => console.error(err)
      );  
    }
    
    getAnalyseTemp(){
      this.rapportService.getNluResult(this.texteRapport, this.selectedRucher).subscribe( 
        data => {},
        ( error => this.errorMsg=error));
        this.subscribeToData();
    }

    getRapportTemp(){
      this.rapportService.getRapportTemp(this.username).subscribe( 
        data => {this.observations = data},
        ( error => this.errorMsg=error));
    }

    saveRapport(){
      this.rapportService.getNluSave(this.texteRapport, this.selectedRucher).subscribe( 
        data => {},
        ( error => this.errorMsg=error));
    }

    private subscribeToData(): void {
      this.timerSubscription = Observable.timer(100).first().subscribe(() => this.getRapportTemp());
  }

  onSelectRucher(event : any) : void{
    this.currentRucherID=String(this.selectedRucher);
    localStorage.setItem("currentRucher",String(this.selectedRucher));
  }


}
