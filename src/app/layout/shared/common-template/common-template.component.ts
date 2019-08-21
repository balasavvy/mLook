import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'common-template',
  templateUrl: './common-template.component.html',
  styleUrls: ['./common-template.component.css']
})
export class CommonTemplateComponent implements OnInit,OnChanges {
  @Input('data') _data;
  @Input('folder') folder;
  @Output() sendData : EventEmitter<any> = new EventEmitter();
  @Output() sendFlagData : EventEmitter<any> = new EventEmitter();
  
  inBoxData: any;
  preview:boolean;
  displayView: any;
  isItem=[];
  isPreviewItem: any=[];
  searchText;
  _ngxDefault: any=[];
  _isAsc =true;
  _dataBp: any[];
  _isData: boolean=false;
  _renderData: any[];
  masterSelected:boolean;
  checkedList: any[];
  enableOptions: boolean;
  enableAllOptions: boolean;
  constructor(private dataService:DataServiceService) {
    this._ngxDefault.push(this.items[0].id);
   
   }
  public items= [{
    "id":'all',
    "name":'All'
  },
  {
    "id":'flagged',
    "name":'Flagged'
  },
  {
    "id":'unread',
    "name":'Unread'
  }];
  ngOnInit() {
   
  }
  ngOnChanges(){
    this.dataService.someProp.subscribe(res => {
      if(this._data && this._data.length){
        let bpData=JSON.parse(JSON.stringify(this._data));;
        this._dataBp=[...bpData];
        this._isData=true;
        this._renderData=this._data;
      }else{
        this._isData=false;
        this._renderData=[];
      }this._renderData.forEach((obj)=>{
        delete obj.isSelected; 
      })
    });
  }
  filter(value: any){
    let getData= this._dataBp;
    const _Listings = JSON.parse(JSON.stringify(getData));
    if(value == 'unread'){
      let filter = _Listings.filter(function (x) {
        return x.unread;
      });
      this._renderData = filter.length?[...filter]:[]
    }else if(value == 'flagged'){
      let filter = _Listings.filter(function (x) {
        return x.flagged;
      });
      this._renderData = filter.length?[...filter]:[]
    }else{
      this._renderData = [...getData]
    }
  }
  previewFn(item){
    this.preview =true;
    this.renderItem(item);
    this.isPreviewItem=[];
    this.isPreviewItem[item.mId]=true;
  }
  renderItem(item: any) {
   this.displayView = item
  }
  mouseActive(item,event){
    this.isItem[item.mId]=true;
    console.log( this.isItem[item.mId])
  }
  mouseInActive(item,event){
     this.isItem[item.mId]=false;
     console.log( this.isItem[item.mId])
   }
   checkValue(item,event){
     if(event.target.checked){
      this.isPreviewItem[item.mId]=true;
     }else{
      this.isPreviewItem[item.mId]=false;
     }
     this.masterSelected = this._renderData.every(function(item:any) {
      return item.isSelected == true
    })
    this.getCheckedItemList();
   }
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this._renderData.length; i++) {
      if(this._renderData[i].isSelected)
      this.checkedList.push(this._renderData[i]);
    }
    if(this.checkedList.length){
      this.enableOptions=true;
        if(this.checkedList.length == this._renderData.length){
          this.enableAllOptions=true;
        }else{
          this.enableAllOptions=false;
        }
    }else{
      this.enableOptions=false;
    }
  }
  
    sortByDate(){
      this._isAsc= this._isAsc?false:true;
      if(this._isAsc){
        this._renderData.sort((a, b) =>{const dateA:any = new Date(a.date);const dateB:any = new Date(b.date);return dateB - dateA});
      }else{
        this._renderData.sort((a, b) =>{const dateA:any = new Date(a.date);const dateB:any = new Date(b.date);return dateA - dateB});
      }     
    }
    flagMsg(item,event){
      console.log("flag");  
        this._renderData.forEach((obj, i) => {
          if(obj.mId == item.mId){
            obj.flagged = obj.flagged?false:true
          }          
        });
        
        this.sendFlagData.emit(this._renderData);
    }
    deleteMsg(item,event){
      this.dataService.getDeletedData =item; //push the data to existing array
      let deleteObj=this.dataService.deletedData; //get the data from array
      this.dataService.mailRData=deleteObj //set into storage

      //update current mailbox
      let $currentData =  this._renderData.filter(function(obj){
        return obj.mId !== item.mId;              
        });        
         this.sendData.emit($currentData);
         this.dataService.someProp.next('some value1');
         this.masterSelected=false;
    }
    deleteOption(event){
      let checkedlist=this.checkedList;
      for(let i=0;i<checkedlist.length;i++){
        let item =checkedlist[i];
        this.dataService.getDeletedData =item; //push the data to existing array
        let deleteObj=this.dataService.deletedData; //get the data from array
        this.dataService.mailRData=deleteObj //set into storage      
      }
      let result  = this._renderData.filter(({ mId: id1 }) => !checkedlist.some(({ mId: id2 }) => id2 === id1));;
     
      this.sendData.emit(result);
      this.dataService.someProp.next('some value1');
      this.masterSelected=false;
    }
    selectAll() {
      for(let i = 0; i < this._renderData.length; i++){
        if( !this._renderData[i].disable){
          this._renderData[i].isSelected = this.masterSelected;
        }
       
      }
      this.getCheckedItemList();
    }
    markread(event){
      let checkedlist=this.checkedList;
      for(let i=0;i<checkedlist.length;i++){
        let itemobj=this.checkedList[i];
        this._renderData.forEach((obj, i) => {
          if(obj.mId == itemobj.mId){
            obj.unread = false
          }          
        });
      }
      this.sendData.emit( this._renderData);
      this.dataService.someProp.next('some value1');
      this.masterSelected=false;
    }
    markunread(event){
      let checkedlist=this.checkedList;
      for(let i=0;i<checkedlist.length;i++){
        let itemobj=this.checkedList[i];
        this._renderData.forEach((obj, i) => {
          if(obj.mId == itemobj.mId){
            obj.unread = true
          }          
        });
      }
     this.sendData.emit( this._renderData);
    this.dataService.someProp.next('some value1');
    this.masterSelected=false;
    }
}
