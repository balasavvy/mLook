import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { InboxComponent } from './inbox/inbox.component';
import { SpamComponent } from './spam/spam.component';
import { DeletedComponent } from './deleted/deleted.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, MainComponent, SidebarComponent, InboxComponent, SpamComponent, DeletedComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    LayoutRoutingModule,
  ],
  exports: [
    LayoutComponent
  ],
})
export class LayoutModule { }
