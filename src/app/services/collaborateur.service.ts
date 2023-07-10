import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborateur } from 'src/app/models/Collaborateur';


const baseUrl = 'http://localhost:8080/collaborateur/';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  constructor(private http: HttpClient) { }
  urli = baseUrl + "getByCuid/"
  // call the api that return collaborateur from cuid.    
  getcolabinfosbycuid(cuid: any): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(`${baseUrl}${cuid}`);
  }

  //get pilote team members
  getteammembersbycuid(cuid: any): Observable<Collaborateur[]> {
    const urli = baseUrl + "getAllCollaborateursbypilote/" + cuid;
    return this.http.get<Collaborateur[]>(urli);
  }

  getAllCollaborateurs(): Observable<Collaborateur[]> {
    const urli = "http://localhost:8080/collaborateurs";
    return this.http.get<Collaborateur[]>(urli);
  }

  activerCompte(cuid: any, data: any): Observable<any> {
    const urli = "http://localhost:8080/activerCompte/" + cuid;
    return this.http.put(urli, data);

  }

  desactiverCompte(cuid: any, data: any): Observable<any> {
    const urli = "http://localhost:8080/desactiverCompte/" + cuid;
    return this.http.put(urli, data);

  }

  getRoles(cuid: any): Observable<String[]> {
    const urli = "http://localhost:8080/getRoles/" + cuid;
    return this.http.get<String[]>(urli);
  }


}