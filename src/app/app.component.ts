import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';


interface TodoList{
  "id" : number,
  "name": string,
  "completeTask": boolean,
  "visible": boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'todo';
  taskName: string = "";
  todoList: TodoList[] = [];
  copyTodoList: TodoList[] = [];
  completeIdTask: number[] = [];
  allCompleteTask: boolean = false;
  idTasksForDelete: number[] = [];
  taskId: number = 0;
  taskLeft: number = 0;

  @ViewChildren(TaskListComponent) taskComponents!: QueryList<TaskListComponent>;

  public changeStateTask(idTask: number){
    let taskUpdate = this.todoList.find(task => task.id == idTask);
    if (taskUpdate) taskUpdate.completeTask = !taskUpdate.completeTask
  }

  deleteCompleteTask():void {
    let updateTodoList = this.todoList.filter((task) => task.completeTask == false);
    this.todoList = updateTodoList;
  }

  public changeAllTask() : void{
    this.allCompleteTask = !this.allCompleteTask;
    this.todoList.forEach((obj)=> {
      obj.completeTask = this.allCompleteTask;
    })
    this.countTaskLeft();
  }

  public addTask() : void {
    this.taskId += 1;
    if (this.taskName != "") this.todoList.push({
      "id": this.taskId,
      "name": this.taskName,
      "completeTask": false,
      visible: true
    });
    this.taskName = "";
    this.copyTodoList = this.todoList;
    this.countTaskLeft();
  }

  public removeTask(idTask: number){
    let updateTodoList = this.todoList.filter(task => task.id !== idTask);
    this.todoList = updateTodoList;
  }

  public viewAllTask(): void{
    this.todoList.forEach((el)=>{
      el.visible = true;
    })
  }

  public viewActiveTask():void{
    this.viewAllTask();
    this.todoList.forEach((el)=>{
      if (el.completeTask == true) el.visible = false;
    })
  }

  public viewCompletedTask(){
    this.viewAllTask();
    this.todoList.forEach((el)=>{
      if (el.completeTask == false) el.visible = false;
    })
  }

  public countTaskLeft() {
    let itemsLeft = this.todoList.filter(obj => obj.completeTask != true)
    this.taskLeft = itemsLeft.length;
  }

  public changeTaskName(data: any){
    let [taskName, idTask] = data
    let taskUpdate = this.todoList.find(task => task.id == idTask);
    if (taskUpdate) taskUpdate.name = taskName;
  }
}