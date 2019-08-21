    
import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import InboxData from 'src/assets/api/inbox.json';
import SpamData from 'src/assets/api/spam.json';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  init() {
   if(this.inboxData){
    this.storage.set("inboxData",[...this.inboxData])
   }
   if(this.spamData){
    this.storage.set("spamData",[...this.spamData])
   }
   if(this.deletedData){
    this.storage.set("deletedData",[...this.deletedData])
   }
  }
  inboxData: any = InboxData;
  spamData: any = SpamData;
  deletedData: any;
  public someProp  = new BehaviorSubject<any>(null);
  constructor(  private http: HttpClient,@Inject(SESSION_STORAGE) private storage: StorageService) { 
    this.init()
  }

  set getInBoxData(val){
    this.inboxData = val;
  }
  get  getInBoxData(){
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
  clear(){
    this.storage.clear();
  }
  removeData(data){
    this.storage.remove(data)
    }
    get mailIData(){
    return this.storage.get("inboxData"); 
    }
    set mailIData(data){
      this.storage.set("inboxData",data)
    }
    get mailSData(){
      return this.storage.get("spamData"); 
      }
      set mailSData(data){
        this.storage.set("spamData",data)
      }
      get mailRData(){
        return this.storage.get("deletedData"); 
        }
        set mailRData(data){
          this.storage.set("deletedData",data)
        }
}
