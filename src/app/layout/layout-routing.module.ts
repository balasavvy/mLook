import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { InboxComponent } from './inbox/inbox.component';
import { SpamComponent } from './spam/spam.component';
import { DeletedComponent } from './deleted/deleted.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  { path: 'inbox',  component: InboxComponent },
  { path: 'spam',  component: SpamComponent },
  { path: 'deleted',  component: DeletedComponent },
  {
    path: "**",
    redirectTo: "/home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
