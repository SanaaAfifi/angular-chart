import { Component, OnInit } from '@angular/core';
import { DropEvent } from 'ng-drag-drop';
import { ChartDataModel } from './data.model';
import { ChartDataService } from './services/chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: Array<ChartDataModel> = new Array<ChartDataModel>();
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  timeline: boolean = true;
  selectedDimension: string = '';
  selectedMeasures: Array<string> =[];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  columns: any;

  constructor(private chartDataService: ChartDataService) {
  }
  ngOnInit() {
    this.getColumns(); 
  }
  getColumns() {
    this.chartDataService.getColumns().subscribe((res) => {
      this.columns = res;

    }, error => {
      console.log(error.message);
    })
  }

  getData( ) {
    if(this.selectedMeasures&& this.selectedMeasures.length && this.selectedDimension)
  {  const measures = this.selectedMeasures;
const  dimension = this.selectedDimension;
    this.chartDataService.getData(measures, dimension).subscribe((res) => {
      this.yAxisLabel = measures.join(', ');
      this.xAxisLabel = dimension;
      let dataObj: Array<ChartDataModel> = new Array<ChartDataModel>();
      for (let i = 1; i < res.length; i++) {
        let series = [];
        for (let j = 0; j < res[i].values.length; j++) {
          series.push({ 'name': res[0].values[j], 'value': Number(res[i].values[j]) })
        }
        dataObj.push({
          name: res[i].name,
          series: series
        });
      }
      this.data = dataObj;
    }, error => {
      console.error(error.message);
    })}
  }

  onDropDimension(event: DropEvent) {
    this.selectedDimension = event.dragData.name;
    this.getData();
    }
  dropAllowedDimension(event: any) {
    return event && event.function && event.function === 'dimension';
  }
  clearDimension() {
    this.selectedDimension ='';
    this.data = [];
    this.xAxisLabel = '';
  }
  onDropMeasure(event: DropEvent) {
    if(this.selectedMeasures.indexOf(event.dragData.name) ===-1)
 {   this.selectedMeasures.push(event.dragData.name);}
    this.getData();
  }
  dropAllowedMeasure(event: any) {

    return event && event.function && event.function === 'measure';
  }

  clearMeasures() {
    this.selectedMeasures = [];
    this.data = [];
    this.yAxisLabel = '';
  }


   
}
