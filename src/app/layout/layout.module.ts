import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { InboxComponent } from './inbox/inbox.component';
import { SpamComponent } from './spam/spam.component';
import { DeletedComponent } from './deleted/deleted.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CustomFolderComponent } from './custom/custom.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { CommonTemplateComponent } from './shared/common-template/common-template.component';
import { ToastrModule } from 'ngx-toastr';
import { DataServiceService } from '../services/data-service.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};
const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'id',
  optionTextField: 'name',
  keepSelectedItems:true
};
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, MainComponent, SidebarComponent, 
    InboxComponent, SpamComponent, DeletedComponent,CustomFolderComponent, CommonTemplateComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    LayoutRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    Ng2SearchPipeModule ,
    NgxSelectModule.forRoot(CustomSelectOptions),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    LayoutComponent
  ],
  providers:[
    DataServiceService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class LayoutModule { }
