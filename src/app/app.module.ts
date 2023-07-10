import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './Auth/helpers/auth.interceptor';


import { NgxChartsModule }from '@swimlane/ngx-charts';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { AddgraficComponent } from './ui/content/activities/grafic/addgrafic/addgrafic.component';
import { ListgraficComponent } from './ui/content/activities/grafic/listgrafic/listgrafic.component';
import { ListgraficnonactiveComponent } from './ui/content/activities/grafic/listgraficnonactive/listgraficnonactive/listgraficnonactive.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PiloteBoardComponent } from './ui/content/boards/pilote-board/pilote-board.component';
import { AddEsimbComponent } from './ui/content/activities/esimb/add-esimb/add-esimb.component';
import { ListEsimbComponent } from './ui/content/activities/esimb/list-esimb/list-esimb.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { AdminBoardComponent } from './ui/content/boards/admin-board/admin-board.component';
import { AddBpuComponent } from './ui/content/boards/admin-board/add-bpu/add-bpu.component';
import { HomeComponent } from 'src/app/Auth/home/home.component';
import { AjouterNropmComponent } from './ui/content/activities/nropm/ajouter-nropm/ajouter-nropm.component';
import { NropmHistoriqueComponent } from './ui/content/activities/nropm/nropm-historique/nropm-historique.component';
import { ListDesatComponent } from './ui/content/activities/desat/list-desat/list-desat.component';
import { AddDesatComponent } from 'src/app/ui/content/activities/desat/add-desat/add-desat.component';
import { KpiComponent } from 'src/app/ui/content/pilotage/kpi/kpi.component';
import { BacklogComponent } from './ui/content/pilotage/backlog/backlog.component';
import { AttachementComponent } from './ui/content/pilotage/attachement/attachement.component';
import { DashboardPiloteComponent } from './ui/content/pilotage/dashboard-pilote/dashboard-pilote.component';
import { TasksComponent } from './ui/content/activities/tasks/tasks.component';
import { TimesheetComponent } from './ui/content/administration/timesheet/timesheet.component';
import { AjoutPrestationComponent } from './ui/content/administration/Prestation/ajout-prestation/ajout-prestation.component';
import { ListPrestationComponent } from './ui/content/administration/Prestation/list-prestation/list-prestation.component';
import { DataTablesModule } from 'angular-datatables';
import { SignupComponent } from './Auth/signup/signup.component';
import { GestionComptesComponent } from './ui/content/administration/comptes/gestion-comptes/gestion-comptes.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    AddgraficComponent,
    ListgraficComponent,
    ListgraficnonactiveComponent,
    PiloteBoardComponent,
    AddEsimbComponent,
    ListEsimbComponent,
    ProfileComponent,
    AdminBoardComponent,
    AddBpuComponent,
    HomeComponent,
    AjouterNropmComponent,
    NropmHistoriqueComponent,
    AddDesatComponent,
    ListDesatComponent,
    KpiComponent,
    BacklogComponent,
    AttachementComponent,
    DashboardPiloteComponent,
    TasksComponent,
    TimesheetComponent,
    AjoutPrestationComponent,
    ListPrestationComponent,
    SignupComponent,
    GestionComptesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxChartsModule
  ],
  providers: [authInterceptorProviders,
    SidebarComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
