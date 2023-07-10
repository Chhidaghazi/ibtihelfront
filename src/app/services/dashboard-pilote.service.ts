import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardPiloteService {
  private url = 'http://localhost:8080/kpi/';


  constructor(private http: HttpClient) { }

  getCtjbyYear( idPrest: number, year: number , nbjour : number , codeTarif : string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const urli = this.url + 'CTJactfilterbyyear?idPrestation=' + idPrest + '&year=' + year + '&nbjour=' + nbjour + '&codeTarif=' + codeTarif;
   // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }

  getStaffingbyYear( idPrest: number, year: number , codeTarif : string): Observable<any> {
    const urli = this.url + 'Staffingactfilterbyyear?idPrestation=' + idPrest + '&year=' + year + '&codeTarif=' + codeTarif;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }
  transformData(data: any[]): any[] {
    return data.map((item) => {
      return {
        name: item.month,
        value: item.value
      };
    });
  }

  getData(idPrest: number, year: number , nbjour : number): Observable<any[]> {
    const urli = this.url + 'CTJactfilterbyyear?idPrestation=' + idPrest + '&year=' + year + '&nbjour=' + nbjour;

    // Replace 'API_URL' with the actual URL of your REST API endpoint
    return this.http.get<any[]>(urli).pipe(
      map(response => response.map(item => ({ name: item.month, value: item.value })))
    );
  }


  getRealiseQte_MoisParequipe( idEquipe: number, year: number , nbjours : string ): Observable<any> {
    const urli = this.url + 'RealiseParequipeYear?idequipe=' + idEquipe + '&year=' + year + '&nbjours=' + nbjours;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }
  GetDmtDeclare( idPrest: number, year: number , codeTarif : string): Observable<any> {
    const urli = this.url + 'DmtDeclarefilterbyyear?idPrestation=' + idPrest + '&year=' + year + '&codeTarif=' + codeTarif;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }
  GetDmtCalcule( idPrest: number, year: number , codeTarif : string): Observable<any> {
    const urli = this.url + 'dmtcalculefilterbyyear?idPrestation=' + idPrest + '&year=' + year + '&codeTarif=' + codeTarif;
    // const urli = 'http://localhost:8080/kpi/CTJactfilterbyyear?idPrestation=1&year=2023&nbjour=1';
    return this.http.get<any>(urli);
  }
}
