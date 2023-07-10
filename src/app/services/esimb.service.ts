import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Esimb } from 'src/app/models/esimb.model';
import { Observable } from 'rxjs';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Esimb_req } from 'src/app/models/Esimb_req';
import { Prestation } from 'src/app/models/Prestation';
import { Tarification } from 'src/app/models/Tarification';




const baseUrl = 'http://localhost:8080/api/esimbs';
let idacte;
let codeIMB;
let date_verification; 
let url= 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class EsimbService {
  esimb: Esimb = {
    codeBanbou: '',
    codeIMB: '',
    dateVerification: undefined,
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
	dateReprise: undefined,
    repriseFacturable: '',
    dateDeadline:null, 
        priorite:"P1",
    tarif: new Tarification()

  };

  constructor(private http: HttpClient) { }

  //Service de save de esimb
  save(data: any): Observable<any> {
    console.log("ee");
    const urli= url+'Add';
    return this.http.post(urli, data, {responseType: 'text'});
  }

  getAll(): Observable<Esimb[]> {
    return this.http.get<Esimb[]>(baseUrl);
  }


   //Service de recherche par Code Banbou
   searchByCodeBanbou(codeBanbou: any): Observable<Esimb[]> {
    const urli= url+"getEsimbBycodeBanbou/"+codeBanbou;
    return  this.http.get<Esimb[]>(urli);
  }

  //Service de recherche par codeIMB
  searchBycodeIMB(codeIMB: any): Observable<Esimb[]> {
        let params = new HttpParams();
        params = params.append('codeIMBString', codeIMB);
        const urli= url+"getEsimbBycodeIMB";
        return this.http.get<Esimb[]>(urli, { params: params });
        }
  //Service de recherche par affectation
  searchByaffectation(affectation: any): Observable<Esimb[]> {
    const urli= url+"getEsimbByAffectation/"+affectation;
    return  this.http.get<Esimb[]>(urli);
  }

  getEsimbByMotif(motif: any): Observable<Esimb[]> {
        const urli= url+"getEsimbByMotif/"+motif; 
        console.log("urli : "+urli);
        return this.http.get<Esimb[]>(urli);
      }

//Search par motif par ordre
    searchByMotifs(motif: any): Observable<Esimb[]> {
      const urli= url+"SearchParMotif/"+motif;
      return  this.http.get<Esimb[]>(urli);
    }

  /*searchByAffectation(affectation: any,cuid: String,active: boolean): Observable<Esimb_req[]> {
      console.log("Affectation service "+affectation);

      const urli= url+"getByAffectation?cuid="+cuid+"&affectation="+affectation;
      return  this.http.get<Esimb[]>(urli);
  }*/

  //Service de recherche par Date de livraison
  searchByDateLivraison(dateLivraison: any): Observable<Esimb[]> {
    const urli= url+"getEsimbByDL/"+dateLivraison;
    return  this.http.get<Esimb[]>(urli);
  }

  //Update esimb service
  Update(idacte: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idacte}`, data);
  }

  //get esimbss
  getEsimbs(cuid: String,role: String): Observable<Esimb[]> {
    const urli= url+"getEsimbs?cuid="+cuid+"&role="+role;
    console.log("urli : "+urli);
    
    return this.http.get<Esimb[]>(urli);
  }

  getActesByCollaborateur(cuid: String): Observable<ActeTraitement[]> {
    const urli= url+"actes?cuid="+cuid;
    console.log("urli : "+urli);
    
    return this.http.get<ActeTraitement[]>(urli);
  }

  getEsimb(codeBanbou: String): Observable<Esimb> {
    const urli= url+"afficheEsimb/"+codeBanbou;
    console.log("urli : "+urli);
    return this.http.get<Esimb>(urli);
  }

  // importer l historique 
uploadHistorique(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', url+"excel", formData, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
} 



getNbEsimbActe(): Observable<any> {
      const urli = url + "esimbNbre" ;
      console.log("urli : " + urli);
      return this.http.get<any>(urli);
  
    }

}
