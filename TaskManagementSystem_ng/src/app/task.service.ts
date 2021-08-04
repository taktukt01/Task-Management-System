import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 

  constructor( private http: HttpClient) { }

  url : string = 'https://localhost:44310/api/Tasks'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //READ 
  getTasks():Observable<Task[]>{
   return this.http.get<Task[]>(this.url);
   // return type : Observable<Task[]>
  }

  //DELETE
  deleteTask(QuoteID: number):Observable<Task>{
  return this.http.delete<Task>(`${this.url}/${QuoteID}`);
  }

  //CREATE
  createTask(task : Task):Observable<Task>{
    return this.http.post<Task>(`${this.url}`, task , this.httpOptions);
  }

  //UPDATE
  updateTask(id:number, task:Task):Observable<Task>
  {
    return this.http.put<Task>(`${this.url}/${id}` , task);
  }
  
}
