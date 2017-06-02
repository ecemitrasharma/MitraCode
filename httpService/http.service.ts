export interface IUserModel{ 
UserId : number
Name : string
Age : number
Gender : string
Address : string
} 
// Promise Version 
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class CustomHttpService {
// URL to web api
public serviceUrl = 'http://localhost:58754/api/';

constructor (private http: Http) {}

public getCall<T>(request: any):Promise<T>{
var url = this.BuildUrl(request);
return this.http.get(url)
.toPromise()
.then(i => <T>i.json())
.catch(this.handleError);
}

public postCall<T> (request: any): Promise<T> {

let headers = new Headers({ 'Content-Type': 'application/json', "Accept":"application/json" });

let options = new RequestOptions({ headers: headers });
var url = this.BuildUrl(request);
return this.http.post(url, request.model, options)
.toPromise()
.then(i=><T>i.json())
.catch(this.handleError);
}

public putCall<T> (request : any): Promise<T> {
return this.http.get(this.serviceUrl)
.toPromise()
.then(i=><T> i.json())
.catch(this.handleError);
}

public deleteCall<T> (request: any): Promise<T> {
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

return this.http.post(this.serviceUrl, request, options)
.toPromise()
.then(i=><T> i.json())
.catch(this.handleError);
}

private extractData(res: Response) {
let body = res.json();
return body || { };
}

private handleError (error: Response | any) {
// In a real world app, we might use a remote logging infrastructure
let errMsg: string;
if (error instanceof Response) {
const body = error.json() || '';
const err = body.error || JSON.stringify(body);
errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
} else {
errMsg = error.message ? error.message : error.toString();
}
console.error(errMsg);
return Promise.reject(errMsg);
}

public BuildUrl(requestParam : any): string{

var url = this.serviceUrl + requestParam.apiUrl;

var counter = 0;
for(var item in requestParam){
counter= counter + 1;
if(item != 'apiUrl'){
if(counter == 1){
url = url + "?" + item+ "=" +requestParam[item]
}else{
url = url + "&" + item+ "=" +requestParam[item]
}
}
}

return url;
}


public User_Get() : Promise<IUserModel> 
{
 let requestObject : any = {apiUrl : 'User'};
return this.getCall<IUserModel>(requestObject)
};

public User_Post(model : IUserModel) : Promise<void> 
{
 let requestObject : any = {"model" :model , apiUrl : 'User'};
return this.postCall<void>(requestObject)
};

public User_GetAssetData(id : number) : Promise<string> 
{
 let requestObject : any = {"id" :id , apiUrl : 'User'};
return this.getCall<string>(requestObject)
};

public User_Put(id : number ,valueaaa : string) : Promise<void> 
{
 let requestObject : any = {"id" :id , "valueaaa" :valueaaa , apiUrl : 'User'};
return this.putCall<void>(requestObject)
};

public User_Delete(id : number) : Promise<void> 
{
 let requestObject : any = {"id" :id , apiUrl : 'User'};
return this.deleteCall<void>(requestObject)
};
}