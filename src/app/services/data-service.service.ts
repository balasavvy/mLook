import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import InboxData from 'src/assets/api/inbox.json';
import SpamData from 'src/assets/api/spam.json';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  inboxData: any = InboxData;
  spamData: any = SpamData;
  deletedData: any;
  constructor(  private http: HttpClient,) { 
  
  }
  set getInpoxData(val){
    this.inboxData = val;
  }
  get  getInpoxData(){
    return this.inboxData;
  }

  set getSpamData(val){
    this.inboxData = val;
  }
  get  getSpamData(){
    return this.spamData;
  }

  set getDeletedData(val){
    this.inboxData = val;
  }
  get getDeletedData(){
    return this.deletedData;
  }
}
