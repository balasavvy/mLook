    
import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Subject } from 'rxjs';
import InboxData from 'src/assets/api/inbox.json';
import SpamData from 'src/assets/api/spam.json';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  init() {
   if(this.inboxDataJson){
    this.storage.set("inboxData",[...this.inboxDataJson])
   }
   if(this.spamDataJson){
    this.storage.set("spamData",[...this.spamDataJson])
   }
   if(this.deletedDataJson){
    this.storage.set("deletedData",[...this.deletedDataJson])
   }
   
  }
  inboxDataJson: any = InboxData;
  spamDataJson: any = SpamData;
  deletedDataJson: any=[];
  customDataArray: any=[];
  inboxData: any=[];
  spamData: any=[];
  deletedData: any=[];
  public someProp  = new BehaviorSubject<any>(null);
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {     
    this.someProp.subscribe((value) => {
      if(!this.mailIData && !this.mailSData && !this.mailRData  ){
        this.init()
      }
      if(!this.mailCData){
        this.storage.set("customDataArray",this.customDataArray)
      }else{
        this.CustomData =this.mailCData
      }
      
    });   
  }

  set getInBoxData(val) {
    this.inboxData.push(val);
  }
  get getInBoxData() {
    return this.inboxData;
  }

  set getSpamData(val) {
    this.spamData.push(val);
  }
  get getSpamData() {
    return this.spamData;
  }

  set getDeletedData(val) {
    this.deletedData.push(val);
  }
  get getDeletedData() {
    return this.deletedData;
  }

  set CustomData(val) {
    this.customDataArray.push(val);
  }
  get CustomData() {
    return this.customDataArray;
  }
  get mailCData() {
    return this.storage.get("customDataArray");
  }
  set mailCData(data) {
    this.storage.set("customDataArray", data)
  }
  clear() {
    this.storage.clear();
  }
  removeData(data) {
    this.storage.remove(data)
  }
  get mailIData() {
    return this.storage.get("inboxData");
  }
  set mailIData(data) {
    this.storage.set("inboxData", data)
  }
  get mailSData() {
    return this.storage.get("spamData");
  }
  set mailSData(data) {
    this.storage.set("spamData", data)
  }
  get mailRData() {
    return this.storage.get("deletedData");
  }
  set mailRData(data) {
    this.storage.set("deletedData", data)
  }

  IunreadCount() {
    let unread = (this.mailIData && this.mailIData.length) ? this.storage.get("inboxData").filter(function (x) {
      return x.unread;
    }) : [];
    return unread
  }
  SunreadCount() {
    let unread = (this.mailSData && this.mailSData.length) ? this.storage.get("spamData").filter(function (x) {
      return x.unread;
    }) : [];
    return unread
  }
  DunreadCount() {

    let unread = (this.mailRData && this.mailRData.length) ? this.storage.get("deletedData").filter(function (x) {
      return x.unread;
    }) : [];
    return unread
  }

}
