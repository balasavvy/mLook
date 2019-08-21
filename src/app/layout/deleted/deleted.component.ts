import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { BsModalService, ModalDirective, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css']
})
export class DeletedComponent implements OnInit {
  @ViewChild('custom') custom: ElementRef;
  modalRef: BsModalRef;
  @ViewChild('deleteConfirm') deleteConfirm: ModalDirective;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };
  deletedData: any;
  deleData: any;
 
  constructor(private toastr: ToastrService,private modalService: BsModalService,private dataService:DataServiceService) {
  
   }

  ngOnInit() {
      this.deletedData=this.dataService.mailRData;
        
  }
  sendData(data){
    this.deleData=data;
    this.ModalConfirmation();  
  }
  sendReadData(data){
    this.dataService.removeData("deletedData");
    this.dataService.getDeletedData =data;
    this.dataService.mailRData=data;
    this.deletedData=this.dataService.mailRData;
  }
  ModalConfirmation() {
    this.modalRef = this.modalService.show(this.deleteConfirm, this.config);
  }
  submitModal(){
    this.dataService.removeData("deletedData");
    this.dataService.getDeletedData =this.deleData; //set
    this.dataService.mailRData=this.deleData; //storage
    this.deletedData=this.dataService.mailRData;
    this.toastr.success("Deleted permanently!");
    if (this.modalRef) {
      this.modalRef.hide();
    }

    this.dataService.someProp.next('some value1');
  }
  hideModal(){
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
