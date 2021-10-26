export interface ResultDataModel
{ 
name : string;
values :  Array<string>
        
}
export interface ChartDataModel{
    name: string;
    series: Array<{name:string,value:number}>;
}