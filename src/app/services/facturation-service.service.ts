import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActeTraitement } from '../models/ActeTraitement';
import { Graphic } from '../models/Graphic';
import { Grafic_req } from '../models/Grafic_req';
import { Attachement } from 'src/app/models/Attachement';



let url= 'http://localhost:8080/api/attachements/';
@Injectable({
  providedIn: 'root'
})
export class FacturationServiceService {

  constructor(private http: HttpClient) { }

  /*getGraficsStatutClient(cuid: String): Observable<Graphic[]> {
    const urli= url+"test";
    console.log("urli : "+urli);
    return this.http.get<Graphic[]>(urli);
    }*/


    /*getAttachements(cuid: String): Observable<Attachement[]> {
      const urli= url+"gettt";
      console.log("urli : "+urli);
      return this.http.get<Attachement[]>(urli);
      }*/

      /*getAttachements(date_Debut_s: string, date_Fin_s: string): Observable<any> {
        const urli = url + 'gettt';
        const params = { date_Debut_s, date_Fin_s };
        return this.http.get(urli, { params });
      }*/

      /*getAttachements(dateDebut: Date, dateFin: Date): Observable<any> {
        const urli = url + 'gettt';
        const dateDebutStr = dateDebut.toISOString().substring(0, 19);
        const dateFinStr = dateFin.toISOString().substring(0, 19);
        const params = { date_Debut_s: dateDebutStr, date_Fin_s: dateFinStr };
        return this.http.get(urli, { params });
      }*/

      getAttachements(dateDebut: Date, dateFin: Date): Observable<any> {
        const urli = url + 'gettt';
        const params = {
          date_Debut_s: dateDebut.toISOString(),
          date_Fin_s: new Date(dateFin.getTime() + 86400000).toISOString() // ajouter une journée pour inclure la date de fin
        };
        return this.http.get(urli, { params });
      }
      
      
  
    getexcel(): Observable<any> {
      const urli= url+"get";
      console.log("urli : localhost:8080/api/attachements/excel ");
      return this.http.get<any>('localhost:8080/api/attachements/excel');
      }


      public generateExcelReportt(dateDebut: string, dateFin: string): Observable<Blob> {
        const params = {date_Debut_s: dateDebut, date_Fin_s: dateFin};
        return this.http.get(`${url}excel`, {
          responseType: 'blob'
        });
      }



      generateExcel(dateDebut: string, dateFin: string): void {
        const urli = url+"excel?dateDebut="+dateDebut+"&dateFin="+dateFin;
        this.http.get(urli, {responseType: 'blob'}).subscribe(blob => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = 'attach.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
        });
      }


      generateExcelReport(dateDebut: string, dateFin: string) {
        const params = {date_Debut_s: dateDebut, date_Fin_s: dateFin};
        return this.http.get<Blob>(`${url}excel`, {params, responseType: 'blob' as 'json'});
      }


      generateExc(dateDebut: Date, dateFin: Date) {
        const urli = url + 'excel';
        const params = {
          date_Debut_s: dateDebut.toISOString(),
          date_Fin_s: new Date(dateFin.getTime() + 86400000).toISOString() // ajouter une journée pour inclure la date de fin
        };        return this.http.get(urli, {params, responseType: 'blob' }); // responseType: 'blob' pour récupérer la réponse sous forme de fichier binaire
      }

    }

