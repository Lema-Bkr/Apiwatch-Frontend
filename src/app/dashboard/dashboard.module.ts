import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DasboardRoutingModule } from './dashboard.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ngfModule } from 'angular-file';
import { WizardComponent } from './wizard/wizard.component';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RucherService } from './service/rucher.service';
import { RucheService } from './service/ruche.service';
import { DailyRecordService } from './service/dailyRecordService';
import { FleursFloraisonService } from './fleurs-floraison/service/fleurs.floraison.service';
import { CapteurService } from './capteur/capteur.service';
import { RucheRucherComponent } from './apiary/ruche-rucher/ruche.rucher.component';
import { MeteoComponent } from './meteo/meteo.component';
import { StackApiaryComponent } from './apiary/stack-apiary/stack-apiary.component';
import { RapportComponent } from './rapport/rapport.component';
import { FleursFloraisonComponent } from './fleurs-floraison/fleurs.floraison.component';
import { CapteurComponent } from './capteur/capteur.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SearchCapteur } from './capteur/capteur.pipe';
import { PipeCapteur } from './capteur/capteur.pipe';
import { SearchFleurPipe, searchFleurByDate, searchFleurByType } from './fleurs-floraison/service/search-fleur.pipe';
import { RapportService } from './rapport/rapport.service';
import { MeteoService } from './meteo/Service/MeteoService';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SidebarService } from './service/sidebar.service';
import { DemoComponent } from '../demo/demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminService } from './admin/service/admin.service';
import { NgxLoadingModule } from 'ngx-loading';
import { Erreur404ComponentComponent } from '../erreur404-component/erreur404-component.component';
import { UserParamsService } from './preference-config/service/user-params.service';
import { PreferenceConfigComponent } from './preference-config/preference-config.component';
import { MelliChartsComponent } from './melli-charts/melli-charts.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { UnitService } from './service/unit.service';
import { GraphGlobal } from './graph-echarts/GlobalGraph';
import { AngularDraggableModule } from 'angular2-draggable';
import { ApiaryNotesComponent } from './apiary/apiary-notes/apiary-notes.component';
import { ObservationService } from './apiary/ruche-rucher/ruche-detail/observation/service/observation.service';
import { MyNotifierService } from './service/my-notifier.service';


@NgModule({
  imports: [
  CommonModule,
    DasboardRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NavbarModule,
    SidebarModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularDraggableModule,
    ngfModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
   //  DragAndCheckModule,
    ArchwizardModule,
    SharedModule,
  ],
  providers: [
    RucherService,
    RucheService,
    RapportService,
    MeteoService,
    DailyRecordService,
    FleursFloraisonService,
    AdminService,
    UnitService,
    GraphGlobal,
    CapteurService,
    SidebarService,
    ObservationService,
    MyNotifierService,
    UserParamsService
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    RucheRucherComponent,
    FeedbackComponent,
    MeteoComponent,
    PipeCapteur,
    DemoComponent,
    SearchCapteur,
    SearchFleurPipe,
    searchFleurByDate,
    searchFleurByType,
    ApiaryNotesComponent,
    CapteurComponent,
    StackApiaryComponent,
    RapportComponent,

    FleursFloraisonComponent,
    WizardComponent,
    PreferenceConfigComponent,
    MelliChartsComponent,
  ]
})
export class DashboardModule { }
