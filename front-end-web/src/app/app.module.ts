import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    // MatSelectModule,
    // MatInputModule,
    // MatFormFieldModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
