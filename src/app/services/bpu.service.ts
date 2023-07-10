import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bpu } from 'src/app/models/Bpu';
import { tap } from 'rxjs/operators';


const baseUrl= 'http://localhost:8080/api/bpus';

@Injectable({
    providedIn: 'root'
  })
  export class BpuService {
    private baseUrl = 'http://localhost:8080/api/bpus';
  
    constructor(private http: HttpClient) { }
    createBPU(bpu: Bpu): Observable<Bpu> {
      return this.http.post<Bpu>(`${this.baseUrl}`, bpu);
    }

    getBpusList(): Observable<Bpu[]>{
        return this.http.get<Bpu[]>(`${this.baseUrl}`);
      }
    
      createBpu(bpu: Bpu): Observable<object>{
        return this.http.post(`${this.baseUrl}`, bpu);
      }
    
      getBpuById(id: number): Observable<Bpu>{
        return this.http.get<Bpu>(`${this.baseUrl}/${id}`);
      }
    

       //Service de save de esimb
  save(data: any): Observable<any> {
    console.log("ee");
    return this.http.post(baseUrl, data, {responseType: 'text'});
  }

  //Update esimb service
  Update(id: any, data: any): Observable<any> {
    console.log("service update BPU"+ data)
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  

  create(data: any, bpu: Bpu): Observable<any> {
    return this.http.post(baseUrl, data, {responseType: 'text'});
  }


  updateObject(bpu: Bpu): Observable<Bpu> {
    if (bpu && bpu.version) {
    bpu.version = bpu.version + 1; // Incrémente la version de 1
    }
    return this.http.put<Bpu>(`${this.baseUrl}/${bpu.id}`, bpu);
  }


  getAll(): Observable<Bpu[]> {
    return this.http.get<Bpu[]>(baseUrl);
  }

  updateBPU(id: number, newBPU: Bpu): Observable<Bpu> {
    return this.http.put<Bpu>(`${this.baseUrl}/${id}`, newBPU);
  }

  }