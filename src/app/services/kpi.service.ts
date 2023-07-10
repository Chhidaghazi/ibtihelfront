import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Attachement } from 'src/app/models/Attachement';
import {Tarification} from '../models/Tarification';
import {Prestation} from '../models/Prestation';



@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private url = 'http://localhost:8080/kpi/';
  private apiUrl = 'http://localhost:8080/kpi/Staffing';
  private urlPre = 'http://localhost:8080/kpi/presttarif';

  actes: Attachement[] = [];

  januaryCTJ  !: any;
  februaryCTJ !: any;
  marchCTJ !: any;
  aprilCTJ !: any;
  mayCTJ !: any;
  juneCTJ !: any;
  julyCTJ !: any;
  augustCTJ !: any;
  septemberCTJ !: any;
  octoberCTJ !: any;
  novemberCTJ !: any;
  decemberCTJ !: any;




  private kpiDataSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }


  /*getGroupedActsByMonth(): Observable<any> {
    const urli = this.url + 'groupbymonth';
    return this.http.get<any>(urli);
  }*/

  getActsByMonth( idPrest: number, idTarif: string , year: number): Observable<any> {
  //  const urli = this.url + 'group-by-month?idPrestation=' + idPrest + '&codeTarif=' + idTarif;
    const urli = this.url + 'group-by-month?idPrestation=' + idPrest + '&codeTarif=' + idTarif + '&year=' + year;
    return this.http.get<any>(urli);
  }


  getSM(actes: ActeTraitement): Observable<any> {
    const urli = this.url +  'dur';
    return this.http.post<any>(urli, actes);
  }

  getStaff(actes: ActeTraitement): Observable<any> {
   const urli = this.url + 'Staffing';

   return this.http.post<any>(urli,   actes);
 }
  getCTJ(actes: ActeTraitement): Observable<any> {
    const urli = this.url +  'CTJ';
    return this.http.post<any>(urli, actes);
  }

  getCapacite(actes: ActeTraitement): Observable<any> {
    const urli = this.url + 'Capacite';
    return this.http.post<any>(urli, actes);
  }
  getDmtDeclaree(actes: ActeTraitement): Observable<any> {
    const urli = this.url + 'dmtDeclaree';
    return this.http.post<any>(urli, actes);
  }


  getDmtCalculee(actes: ActeTraitement): Observable<any> {
    const urli = this.url + 'dmtCalculee';
    return this.http.post<any>(urli, actes);
  }


  getEtp(actes: ActeTraitement): Observable<any> {
    const urli = this.url + 'ETP';
    return this.http.post<any>(urli, actes);
  }


  getActesByPrestTarif(idPrest: number, idTarif: string): Observable<any> {
    const urli = this.url + 'byprestationn?idPrestation=' + idPrest + '&codeTarif=' + idTarif;
    return this.http.get<any>(urli);
  }

  actesByPrest(actes: any): Observable<any> {
    const urlWithEndpoint = this.url + 'ActesByPrest';
    return this.http.post<any>(urlWithEndpoint, actes);
  }
  getTarifBypres(pre: Prestation): Observable<any> {
    const urlP = this.urlPre ;
    return this.http.post<any>(urlP, pre);
  }


  getcountbypres(idpres: number): Observable<any> {
    const urlP = this.url + 'countbypres' ;
    return this.http.post<any>(urlP, urlP);
  }
  getRealiseQte_MoisParequipe( idEquipe: number, year: number , nbjours : number): Observable<any> {
    const urli = this.url + 'RealiseParequipeYear?idequipe=' + idEquipe + '&year=' + year + '&nbjours=' + nbjours;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }

  getRealiseQte_MoisParequipe1( idEquipe: number, year: number , nbjours : number , idPrest: number,  codeTarif : string): Observable<any> {
    const urli = this.url + 'RealiseParequipeYear1?idequipe=' + idEquipe + '&year=' + year + '&nbjours=' + nbjours + '&idPrestation=' + idPrest + '&codeTarif=' + codeTarif ;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }


  getReaSurCapa( idPrestation:number , year: number ,  nbjours : number  ,  codeTarif : string , idEquipe: number): Observable<any> {
    const urli = this.url + 'ReaCaparbyyear?idPrestation=' + idPrestation + '&year=' + year +  '&codeTarif=' + codeTarif + '&nbjours=' + nbjours +  '&idequipe=' + idEquipe ;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }

  getProd( idPrestation:number , idEquipe: number, year: number , prix: number,  staffingdef : number  ,  codeTarif : string): Observable<any> {
    const urli = this.url + 'Prodfilterbyyear?idPrestation=' + idPrestation + '&year=' + year +  '&prix=' + prix + '&staffingdef=' + staffingdef +  '&codeTarif=' + codeTarif + '&ideq=' + idEquipe ;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }

}
