import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { SalesOverviewGrapComponent } from './dashboard-components/sales-overview-grap/sales-overview-grap.component';
import { VisiterGraphComponent } from './dashboard-components/visiter-graph/visiter-graph.component';
import { StickerComponent } from './dashboard-components/sticker/sticker.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ListBillsComponent } from './dashboard-components/list-bills/list-bills.component';
import { FormBillComponent } from './dashboard-components/form-bill/form-bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataDialogComponent } from './dashboard-components/data-dialog/data-dialog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent, SalesOverviewGrapComponent, VisiterGraphComponent, StickerComponent, ContactsComponent, ActivityComponent, ListBillsComponent, FormBillComponent, DataDialogComponent]
})
export class DashboardModule {}
