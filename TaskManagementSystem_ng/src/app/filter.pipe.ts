import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from './task';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dataTable: MatTableDataSource<Task>, searchText: string): any {
    searchText = searchText.toLocaleLowerCase();
    return dataTable.data.filter(task => task.Quote_Type.includes(searchText));
  }

}
