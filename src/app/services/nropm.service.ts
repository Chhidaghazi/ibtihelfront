import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nropm } from '../models/Nropm';
import { Pm } from '../models/Pm';



let url = 'http://localhost:8080/api/nropm/';
@Injectable({
  providedIn: 'root'
})
export class NropmService {

  constructor(private http: HttpClient) { }


  getNropmsNontraites(): Observable<Nropm[]> {

    const urli = url + "nropmsNonTraites";

    console.log("urli : " + urli);

    return this.http.get<Nropm[]>(urli);

  }




  getNropmstraites(): Observable<Nropm[]> {

    const urli = url + "nropmsTraites";

    console.log("urli : " + urli);

    return this.http.get<Nropm[]>(urli);

  }




  getNropm(cog: String): Observable<Nropm> {

    const urli = url + "afficheNropm/" + cog;

    console.log("urli : " + urli);

    return this.http.get<Nropm>(urli);

  }

  getAllNropm(): Observable<Nropm[]> {

    const urli = url + "nropms";

    console.log("urli : " + urli);

    return this.http.get<Nropm[]>(urli);

  }


  getNropmByUi(ui: String): Observable<Nropm[]> {

    const urli = url + "rechercheParUi/" + ui;

    console.log("urli : " + urli);

    return this.http.get<Nropm[]>(urli);

  }




  getNropmByCog(cog: String): Observable<Nropm[]> {
    const urli = url + "rechercheParCog/" + cog;
    console.log("urli : " + urli);
    return this.http.get<Nropm[]>(urli);

  }




  getNropmByAffectation(affectation: String): Observable<Nropm[]> {
    const urli = url + "rechercheParAffectation/" + affectation;
    console.log("urli : " + urli);
    return this.http.get<Nropm[]>(urli);
  }








  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', url + "importNropmATraiter", formData, {
      reportProgress: true,
      responseType: 'json'

    });
    return this.http.request(req);

  }




  uploadHistorique(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', url + "importHistoriqueNropm", formData, {
      reportProgress: true,
      responseType: 'json'

    });
    return this.http.request(req);

  }







  create(data: any): Observable<any> {
    const urli = url + "ajouterNropm";
    return this.http.post(urli, data);

  }


  getNropmByMotif(motif: String[]): Observable<Nropm[]> {
    const urli = url + "rechercheParMotif/" + motif;
    console.log("urli : " + urli);
    return this.http.get<Nropm[]>(urli);
  }

  updateNropm(cog: any, data: any): Observable<any> {
    const urli = url + "modifierNropm/" + cog;
    return this.http.put(urli, data);

  }




  traiterNropm(cog: any, data: any): Observable<any> {
    const urli = url + "traiterNropm/" + cog;
    return this.http.put(urli, data);

  }




  mettreEnCours(cog: any, data: any): Observable<any> {
    const urli = url + "mettreEnCours/" + cog;
    return this.http.put(urli, data);

  }


  annulerEnCours(cog: any, data: any): Observable<any> {
    const urli = url + "annulerEnCours/" + cog;
    return this.http.put(urli, data);

  }


  
getNbNroActe(): Observable<any> {
      const urli = url + "nropmNbre" ;
      console.log("urli : " + urli);
      return this.http.get<any>(urli);
    }

}
