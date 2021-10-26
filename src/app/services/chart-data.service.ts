import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ResultDataModel } from '../data.model';

@Injectable()
export class ChartDataService {

  constructor(private httpClient : HttpClient) { }
  getColumns ()
  {
return this.httpClient.get('https://plotter-task.herokuapp.com/columns');
  }
  getData  (measures:Array<string>,dimension:string) : Observable<Array<ResultDataModel>>
  { 
     
    return this.httpClient.post<Array<ResultDataModel>>('https://plotter-task.herokuapp.com/data',{
      "measures": measures,
"dimension": dimension
    });

  }
}
