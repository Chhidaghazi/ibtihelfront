import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEsimbComponent } from 'src/app/ui/content/activities/esimb/add-esimb/add-esimb.component';
import { AddgraficComponent } from 'src/app/ui/content/activities/grafic/addgrafic/addgrafic.component';
import { ListEsimbComponent } from 'src/app/ui/content/activities/esimb/list-esimb/list-esimb.component';
import { ListgraficComponent } from 'src/app/ui/content/activities/grafic/listgrafic/listgrafic.component';
import { ListgraficnonactiveComponent } from 'src/app/ui/content/activities/grafic/listgraficnonactive/listgraficnonactive/listgraficnonactive.component';
import { LoginComponent } from 'src/app/Auth/login/login.component';
import { PiloteBoardComponent } from 'src/app/ui/content/boards/pilote-board/pilote-board.component';
import { AdminBoardComponent } from 'src/app/ui/content/boards/admin-board/admin-board.component';
import { AddBpuComponent } from 'src/app/ui/content/boards/admin-board/add-bpu/add-bpu.component';
import { ProfileComponent } from 'src/app/Auth/profile/profile.component';
import { HomeComponent } from 'src/app/Auth/home/home.component';
import { NropmHistoriqueComponent } from 'src/app/ui/content/activities/nropm/nropm-historique/nropm-historique.component';
import { AjouterNropmComponent } from 'src/app/ui/content/activities/nropm/ajouter-nropm/ajouter-nropm.component';
import { AddDesatComponent } from 'src/app/ui/content/activities/desat/add-desat/add-desat.component';
import { ListDesatComponent } from 'src/app/ui/content/activities/desat/list-desat/list-desat.component';
import { BacklogComponent } from 'src/app/ui/content/pilotage/backlog/backlog.component';
import { KpiComponent } from 'src/app/ui/content/pilotage/kpi/kpi.component';
import { AttachementComponent } from 'src/app/ui/content/pilotage/attachement/attachement.component';
import { DashboardPiloteComponent } from 'src/app/ui/content/pilotage/dashboard-pilote/dashboard-pilote.component';
import { TasksComponent } from 'src/app/ui/content/activities/tasks/tasks.component';
import { TimesheetComponent} from 'src/app/ui/content/administration/timesheet/timesheet.component';
import { AjoutPrestationComponent } from './ui/content/administration/Prestation/ajout-prestation/ajout-prestation.component';
import { ListPrestationComponent } from './ui/content/administration/Prestation/list-prestation/list-prestation.component';
import { SignupComponent } from 'src/app/Auth/signup/signup.component';
import { GestionComptesComponent } from 'src/app/ui/content/administration/comptes/gestion-comptes/gestion-comptes.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
 // { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
 //{ path: 'user', component: BoardUserComponent },
  //{ path: 'prod', component: BoardProducteurComponent },
  { path: 'pilo', component: PiloteBoardComponent},
  //{ path: 'dir', component: BoardDirectionComponent },
 { path: 'admin', component: AdminBoardComponent},
 //{ path: 'ESIMB', component: ESIMBComponent },
 //{ path: 'Desat', component: DESATComponent },
// { path: 'NRO-PM', component: NROPMComponent },
 {path: 'AddEsimb', component: AddEsimbComponent},
 //{path: 'admin/Add', component: AddBpuComponent},
 //{path: 'MODIF/:idactetrait', component: ModifComponent},
 //{path: 'MODIF/:esimb', component: ModifComponent},
 //{path: 'Graphic', component: GraphicComponent},
 {path: 'ListEsimb', component: ListEsimbComponent},
 {path: 'AddGrafic', component: AddgraficComponent},
 {path: 'ListGrafic', component: ListgraficComponent},
 {path: 'listgraficnonactive', component:ListgraficnonactiveComponent},
 //{path: 'modifgraphic', component: ModifgraphicComponent},
 { path: 'AddDesat', component: AddDesatComponent },
 { path: 'ListDesat', component: ListDesatComponent},
 { path: 'traiterNropm', component: NropmHistoriqueComponent },
 { path: 'ajouterNropm', component: AjouterNropmComponent },

 { path: 'attachement', component: AttachementComponent },
{ path: 'backlog', component: BacklogComponent },
{ path: 'kpi', component: KpiComponent},

{ path: 'dashboardPilote', component: DashboardPiloteComponent},
{ path: 'tasks', component: TasksComponent},
{ path: 'timesheet', component: TimesheetComponent},

{ path: 'ajoutPrestation', component: AjoutPrestationComponent},

{ path: 'listPrestation', component: ListPrestationComponent},


  { path: '', component: LoginComponent  },
  { path: 'signUp', component: SignupComponent },


  { path: 'gestionComptes', component: GestionComptesComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
