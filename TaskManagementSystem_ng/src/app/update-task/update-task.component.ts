import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task, TaskDetail } from '../task';
import { TaskService } from '../task.service';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task: Task;
  constructor(
    // inject data from parent component
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,

  ) {
    // dialogRef.beforeClosed().subscribe(() => {
    //     dialogRef.close(this.task);
    // });
  }

  ngOnInit(): void {
  }


  // reloadComponent() {
  //   let currentUrl = this.router.url;
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate([currentUrl]);
  // }



  updateTask(inputTask: NgForm) {
    if (inputTask.form.valid) {
      this.task = {
        // Cannot change Primary Key in .NET so it remains the same.
        QuoteID: this.data.QuoteID,
        Quote_Type: inputTask.form.value["QuoteType"].trim(),
        Contact: inputTask.form.value["Contact"].trim(),
        Task_Description: inputTask.form.value["TaskDescription"].trim(),
        Due_Date: inputTask.form.value["DueDate"],
        Task_Type: inputTask.form.value["TaskType"].trim()
      }
      let taskDetail: TaskDetail = {
        QuoteID: inputTask.form.value["QuoteID"],
        Quote_Type: inputTask.form.value["QuoteType"],
        Contact: inputTask.form.value["Contact"],
        Task_Description: inputTask.form.value["TaskDescription"],
        Due_Date: inputTask.form.value["DueDate"],
        Task_Type: inputTask.form.value["TaskType"],
        Status: inputTask.form.value["Status"]
      }
      // this.taskDetailList.push(taskDetail);
      this.taskService.updateTask(this.data.QuoteID, this.task).subscribe();
      
      this.dialogRef.close(
        {
          data: this.task
        });
      // make changes to parent?
      // we would need to access 
      //get  Task from Dashboard, and update the field values?.
    }
  }
}

