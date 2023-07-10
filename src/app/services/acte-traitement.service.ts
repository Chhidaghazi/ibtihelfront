import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nropm } from '../models/Nropm';
import { Pm } from '../models/Pm';
import { ActeTraitement } from '../models/ActeTraitement';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

let url= 'http://localhost:8080/api/acteTraitement/';


@Injectable({

  providedIn: 'root'

})

export class ActeTraitementService {

  constructor(private http: HttpClient) { }

//Get Backlog

  getActesNontraites(): Observable<ActeTraitement[]> {
      const urli = url + "actesNonTraites";
       console.log("urli : " + urli);
      return this.http.get<ActeTraitement[]>(urli);
    }



//Get Kpi
getActesKpis(dateDebut: Date, dateFin: Date): Observable<any> {
  if (!dateDebut || !dateFin || isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime())) {
    return throwError('Invalid date range'); // Gérer l'erreur pour empêcher la suite du code de s'exécuter
  }

  const urli = url + "actes";
  const params = {
    date_Debut_s: dateDebut.toISOString(),
    date_Fin_s: new Date(dateFin.getTime() + 86400000).toISOString()
  };

  return this.http.get(urli, { params }).pipe(
    catchError((err) => {
      console.log(err);
      return throwError('Une erreur s\'est produite lors de la récupération des actes.');
    })
  );
}


  modifierPriorite(idacte: any, data: any): Observable<any> {
      const urli = url + "modifierPriorite/" + idacte;
    return this.http.put(urli, data);

    }




getActe(idacte: String): Observable<any> {
      const urli = url + "getActe/" + idacte;
      console.log("urli : " + urli);
      return this.http.get<any>(urli);
  
    }


  rechercherParId(typePrestation: String,id: String): Observable<ActeTraitement[]> {

    const urli= url+"rechercheParId/"+typePrestation+"/"+id;

    console.log("urli : "+urli);

    return this.http.get<ActeTraitement[]>(urli);

}

getNbActe(): Observable<any> {
      const urli = url + "actesNbre" ;
      console.log("urli : " + urli);
      return this.http.get<any>(urli);
  
    }

}