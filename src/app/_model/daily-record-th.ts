export interface DailyRecordTh {

    id : string;
	recordDate : string;
	idHive : string;
	humidity_int_min : number;
	humidity_int_max : number;
	temp_int_min : number;
	temp_int_max : number;
	temp_int_moy : number;
	temp_int_stddev : number;
	health_status : string;
	health_trend  :string;
    r_int_text : string;
    
    //[class]="getColorStatus(i)"
}
