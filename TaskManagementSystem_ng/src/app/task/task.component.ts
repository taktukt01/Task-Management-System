import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

// Component for ADDING , UPDATING Tasks
export class TaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task[],  //data passed in from parent 


  ) { }


  ngOnInit(): void {
  }


  addTask(inputTask: NgForm): void {
    // call services.http.post
    if (inputTask.form.valid) {
      let task: Task = {
        QuoteID: 0,
        Quote_Type: inputTask.form.value["QuoteType"].trim(),
        Contact: inputTask.form.value["Contact"].trim(),
        Task_Description: inputTask.form.value["TaskDescription"].trim(),
        Due_Date: inputTask.form.value["DueDate"],
        Task_Type: inputTask.form.value["TaskType"].trim()
      }
      //close dialog and send back new task
      this.taskService.createTask(task).subscribe(newTask => {
        this.dialogRef.close(newTask)});
  }else{
  console.warn("Unable to add Task!");
}
  }


}