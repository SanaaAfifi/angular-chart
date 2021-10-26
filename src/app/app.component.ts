import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  selectedDimension : any;
  selectedMeasures : any  ;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  columns: any;

  constructor(private chartDataService: ChartDataService) {
  }
  ngOnInit() {
   this.getColumns();
    this.getData(['Cost', 'Revenue'], 'Product')

  }
  measurePredict(column:any)
  {
    return column.function==='measure';
  }
  clearDimension()
  {
    this.selectedDimension = [];
  }
  clearMeasures(){
    this.selectedMeasures = [];
  }
  drop(event: CdkDragDrop<string[]>) {
    // console.log(event)
    if (event.previousContainer !== event.container) {
     
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getColumns()
{  this.chartDataService.getColumns().subscribe((res)=>{
  this.columns = res;

},error=>{
  console.log(error.message);
})
}  

  getData(measures: Array<string>, dimension: string) {
    this.chartDataService.getData(measures, dimension).subscribe((res) => {  
      this.yAxisLabel = measures.join(', ');
      this.xAxisLabel = dimension;
      let index = 0;
      let dataObj : Array<ChartDataModel> = new Array<ChartDataModel>();
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
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
 