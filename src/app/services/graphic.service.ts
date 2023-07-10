import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActeTraitement } from '../models/ActeTraitement';
import { Graphic } from '../models/Graphic';
import { Grafic_req } from '../models/Grafic_req';


let url= 'http://localhost:8080/api/graphic/';

@Injectable({
    providedIn: 'root'
  })
  export class GraphicService {
   

    
    //Contructeur
    constructor(private http: HttpClient) { }
    
   //Done ----------------------------------------------------------------

   //get graphics active
    getGraficsActive(cuid: String): Observable<Grafic_req[]> {
    const urli= url+"getActiveGraphics?cuid="+cuid;
    console.log("urli : "+urli);
    return this.http.get<Graphic[]>(urli);
    }

    //get graphics non active 
    getGraficsNonActive(cuid: String): Observable<Grafic_req[]> {
      const urli= url+"getNonActiveGraphics?cuid="+cuid;
      console.log("urli : "+urli);
      return this.http.get<Graphic[]>(urli);
    }
    
    //Deactive Grafic 
    deactiveGrafic(data: Grafic_req): Observable<any> {
      const urli= url+"Deactive";
      console.log("urli : "+urli);
      console.log("dataidactetrait : "+data.code_imb);
      return this.http.put(urli, data, {responseType: 'text'});
    }

    //Active Grafic 
    activeGrafic(data: Grafic_req): Observable<any> {
      const urli= url+"Active";
      console.log("urli : "+urli);
      return this.http.put(urli, data, {responseType: 'text'});
    }
    

    //Search service by ID Graphic
    searchByIdGraphic(IdGraphic: any,cuid: String,active: boolean): Observable<Grafic_req[]> {
      if (active) {
        const urli= url+"getActiveByIdGrafic?cuid="+cuid+"&idGraphic="+IdGraphic;
        return  this.http.get<Graphic[]>(urli);
      } else {
        const urli= url+"getNonActiveByIdGrafic?cuid="+cuid+"&idGraphic="+IdGraphic;
        return  this.http.get<Graphic[]>(urli);
      }
    }

    //Search service by Date de traitement
    searchByDateTraitement(dateTraitement: any,cuid: String,active: boolean): Observable<Grafic_req[]> {
      if (active) {
        const urli= url+"getActiveByIdDateTraitement?cuid="+cuid+"&dateTtraitement="+dateTraitement;
        return  this.http.get<Graphic[]>(urli);
      } else {
        const urli= url+"getNonActiveByIdDateTraitement?cuid="+cuid+"&dateTtraitement="+dateTraitement;
        return  this.http.get<Graphic[]>(urli);
      }
    }

    //Search service by Affectation
    searchByAffectation(affectation: any,cuid: String,active: boolean): Observable<Grafic_req[]> {
      if (active) {
        console.log("Affectation service "+affectation);

        const urli= url+"getActiveByAffectation?cuid="+cuid+"&affectation="+affectation;
        return  this.http.get<Graphic[]>(urli);
      } else {
        const urli= url+"getNonActiveByAffectation?cuid="+cuid+"&affectation="+affectation;
        return  this.http.get<Graphic[]>(urli);
      }
    }

    updateGrafic(data: Grafic_req): Observable<any> {
      const urli= url+"Update";
      return this.http.put(urli, data, {responseType: 'text'});
    }
   //End Done ----------------------------------------------------------------

    //Service de save de graphic
    save(data: any): Observable<any> {
      const urli= url+'Add';
      return this.http.post(urli, data, {responseType: 'text'});
    }


    /*//Update graphic service
    update(graphic: Grafic_req): Observable<any> {
      console.log("-------------------- ! start update service");
      const urli = 'http://localhost:8080/api/graphic/Updatee';
      //const urli= url+'Updatee';
      console.log(" urllll : "+urli);
      console.log(" sent object : "+"ID Graphic "+this.currentGraphic.idGrafic);
      console.log("-------------------- end update service");
      return this.http.put(urli, this.currentGraphic, {responseType: 'text'}); 
    }*/


    getGrafic(IdGraphic: String): Observable<Graphic> {
      const urli= url+"afficheGrafic/"+IdGraphic;
      console.log("urli : "+urli);
      return this.http.get<Graphic>(urli);
    }


    
getNbGraficActe(): Observable<any> {
      const urli = url + "graficNbre" ;
      console.log("urli : " + urli);
      return this.http.get<any>(urli);
  
    }

    
  }