import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Family } from './family';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private apiServiceUrl =environment.apiServiceUrl;

  constructor(private http:HttpClient) { }

  public getFamily(): Observable<Family[]>{

    return this.http.get<Family[]>('http://localhost:8080/family/all');
  }

  public addFamily(family:Family): Observable<Family>{

    return this.http.post<Family>('http://localhost:8080/family/add',family);
  }

  public updateFamily(family:Family): Observable<Family>{

    return this.http.put<Family>('http://localhost:8080/family/update',family);
  }

  public deleteFamily(familyID:number): Observable<void>{

    return this.http.delete<void>('http://localhost:8080/family/delete/'+familyID);
  }
}
