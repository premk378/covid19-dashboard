import { BrowserModule } from '@angular/platform-browser';
import {
  NbActionsModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule, NbInputModule,
  NbLayoutModule,
  NbListModule, NbSpinnerModule,
  NbThemeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { LineComponent } from './line/line.component';
import { BarComponent } from './bar/bar.component';
import { TabularComponent } from './tabular/tabular.component';
import { FeedsComponent } from './feeds/feeds.component';
import {AboutComponent} from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    DoughnutComponent,
    LineComponent,
    BarComponent,
    TabularComponent,
    FeedsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbListModule,
    NbAutocompleteModule,
    NbInputModule,
    NbActionsModule,
    NbDialogModule.forRoot({}),
    NbSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutComponent]
})
export class AppModule { }
