import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Desat } from 'src/app/models/Desat';
import { Prestation } from '../models/Prestation';
import { Tarification } from 'src/app/models/Tarification';



const baseUrl = 'http://localhost:8080/api/desats';
let url= 'http://localhost:8080/api/';


@Injectable({
  providedIn: 'root'
})
export class DesatService {

  desat: Desat={
    idacte:'',
    refTacheBPU:'',
    type_prestation: new Prestation(),
    type_element:'',
    quantite:1,
    dateReception:undefined,
    dateLivraison:undefined,
    dateValidation:undefined,
    affectation: '',
    duree: 1,
    commentaire: '',
	  motif: '',
    statutFacturation: '',
    dateReprise: '',
    repriseFacturable: '',
    motifReaffectation:'',
    fi: '',
    zone:'',
    date_refus: undefined,
    
    statut_operatonnels:'',
    date_reafictation:undefined,
    cog:'',
    ui:'',
    date_liv_reafictation:undefined,
    priorite:'P1',
    dateDeadline:null,
    tarif: new Tarification()
  };

  constructor(private http: HttpClient) { }

  // save desat
  save(data: any): Observable<any> {
    console.log("ee");
    const urli= url+'desatAdd';
    return this.http.post(urli, data, {responseType: 'text'});
  }
// traiter desat
/*traiter(data: any): Observable<any> {
  console.log("ee");
  const urli= url+'traiter';
  return this.http.post(urli, data, {responseType: 'text'});
}*/

 //traiter desat (idacte,desat)
 traiter(idacte: any, data: any): Observable<any> {

  const urli = url + "traiter/" + idacte;
  return this.http.put(urli, data);
 
   }

  // afficher list desat
   getAll(): Observable<Desat[]> {
    return this.http.get<Desat[]>(baseUrl);
  }


  
  mettreEnCours(idacte: any, data: any): Observable<any> {
    const urli = url + "mettreEnCours/" + idacte;
    return this.http.put(urli, data);
  
  }
  
  annulerEnCours(idacte: any, data: any): Observable<any> {
    const urli = url + "annulerEnCours/" + idacte;
    return this.http.put(urli, data);
  
  }
   
  //Service de recherche par cog
  searchByCog(cog: any): Observable<Desat[]> {
    const urli= url+"getDesatByCog/"+cog;
    return  this.http.get<Desat[]>(urli);
  }

    //Service de recherche par Fi
    searchByFi(fi: any): Observable<Desat[]> {
      const urli= url+"getDesatByFI/"+fi;
      return  this.http.get<Desat[]>(urli);
    }

    //Service de recherche par ui
    searchByUi(ui: any): Observable<Desat[]> {
      const urli= url+"getDesatByUi/"+ui;
      return  this.http.get<Desat[]>(urli);
    }

   // methode 2 affectation 
   searchByaffectation(affectation: any): Observable<Desat[]> {
    const urli= url+"getDesatByAffectation/"+affectation;
    return  this.http.get<Desat[]>(urli);
  }
  // methode 2 affectation par ordre
  searchByMotifs(motif: any): Observable<Desat[]> {
    const urli= url+"rechercheParMotif/"+motif;
    return  this.http.get<Desat[]>(urli);
  }
   // methode recherche 
   searchByMotif(motif: any): Observable<Desat[]> {
    const urli= url+"getDesatByMotif/"+motif;
    return  this.http.get<Desat[]>(urli);
  }

    // methode 1 affectation
    searchByAffectation(affectation: any,cuid: String): Observable<Desat[]> {
      console.log("Affectation service "+affectation);
      const urli= url+"getByAffectation?cuid="+cuid+"&affectation="+affectation;
      return  this.http.get<Desat[]>(urli);
    }

     //Update desat service
    Update(idacte: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idacte}`, data);
     }

   //Service de recherche par Date de livraison
  searchByDateLivraison(dateLivraison: any): Observable<Desat[]> {
    const urli= url+"getDesatByDL/"+dateLivraison;
    return  this.http.get<Desat[]>(urli);
  }

 getDesat(id: String): Observable<Desat> {
    const urli= url+"afficheDesat/"+id;
    console.log("urli : "+urli);
    return this.http.get<Desat>(urli);
  }
// importer desat a traiter 

upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', url+"importDesatATraiter", formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  } 

  // importer l historique 
uploadHistorique(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', url+"dexcel", formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
} 

// liste desat a traiter 
getDesatVide(): Observable<Desat> {
  const urli= url+"empty-delivery-date";
  console.log("urli : "+urli);
  return this.http.get<Desat>(urli);
}


// liste de l historique desat
getDesatNonVide(): Observable<Desat> {
  const urli= url+"non-empty-delivery-date";
  console.log("urli : "+urli);
  return this.http.get<Desat>(urli);
}


getNbDesatActe(): Observable<number> {
      const urli = url + "desatsNbre" ;
      console.log("urli : " + urli);
      return this.http.get<number>(urli);
  
    }


  


}

