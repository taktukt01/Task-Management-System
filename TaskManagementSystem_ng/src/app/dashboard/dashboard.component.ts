import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { FormControl } from '@angular/forms';
import { TaskDetailComponent } from '../task-detail/task-detail.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  // dependency injection
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }
  taskList: Task[] = [];

  // taskList: Task[] = [];
  //arg : initial data
  dataSource = new MatTableDataSource(this.taskList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Task>;


  myControl = new FormControl();

  searchText: string = '';
  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy(): void {

  }

  ngOnChange(): void {
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // surely paginator has some information for us
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  // //check datasource value

  // checkDataSource() {
  //   var x = this.taskList;
  //   var y = this.dataSource.data;
  //   debugger;
  // }

  // SEARCH
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  //OPEN ADD TASK DIALOG
  openDialog() {
    const dialogRef = this.dialog.open(TaskComponent, { // grab the data that we get back
      data: this.dataSource.data // send in the "task list"
    });

// after receieivng back new task 
    dialogRef.afterClosed().subscribe(data => { var newTask = data; this.dataSource.data.push(newTask) ;
      var newTaskList = this.dataSource.data;
      this.dataSource.data = newTaskList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
    // this.dataSource.data = newTaskList })
    // after dialog is closed, 
  }

  //OPEN VIEW DIALOG

  openDetailDialog(task: Task) {
    this.dialog.open(TaskDetailComponent,
      {
        data: task
      })
  }

  //return index of Task that matches current quoteNum
  findTask(quoteNum: Number) {
    return this.dataSource.data.findIndex(task =>
      task.QuoteID == quoteNum)
  };

  //OPEN EDIT DIALOG

  openEditDialog(task: Task) {
    // OPEN EDIT TASK COMPONENT, pass current task 
    const dialogRef = this.dialog.open(UpdateTaskComponent,
      {
        data: task
      });
    //get data back after update task dialog box is closed 
    let idx: Number;
    dialogRef.afterClosed().subscribe(ret => {
      if (this.findTask(ret.data.QuoteID) !== -1) {
        //replace task with new and updated task
        this.dataSource.data[this.findTask(ret.data.QuoteID)] = ret.data;  // get the new and updated task
        var x = this.dataSource.data;  //set it to a variable
        this.dataSource.data = x;  // reassign datasource to the new "taskList"
      } else {
        console.log(":(" + ret.data.QuoteID);
      };
    })
  }


  //READ
  getTasks(): void {
    this.taskService.getTasks().subscribe(data => this.dataSource.data = data)
  }



  //DELETE
  deleteTask(QuoteID: number): void {
    this.taskService.deleteTask(QuoteID).subscribe();
    // our API delete/id returns the deleted Quote/Task. Which we don't care for.
    //so we need to now remove this QuoteID task from our MatTable
    // filter our dataSource.. return all Tasks with QuoteID !== QuoteID
    this.dataSource.data = this.dataSource.data.filter(task => task.QuoteID !== QuoteID);
  }


  //SEARCH

  search(inputTask: string) {
  }


  displayedColumns: string[] =
    ['Quote_Type', 'QuoteID', 'Contact', 'Task_Description'
      , 'Due_Date', 'Task_Type', 'actionsColumn'];


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  Logout(){
    localStorage.removeItem("token");
  }

}

