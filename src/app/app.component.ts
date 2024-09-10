import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { TodoList } from './types/todo';
import { ToDoListService } from './services/to-do-list.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(public toDoListService: ToDoListService = new ToDoListService()) {}

    title = 'todo';
    taskName: string = '';
    todoList: TodoList[] = [];
    allCompleteTask: boolean = false;
    idTasksForDelete: number[] = [];
    taskId: number = 0;
    taskLeft: number = 0;

    public changeStateTask(taskId: number) {
        this.toDoListService.changeStateTask(taskId);
    }

    public deleteCompleteTask(): void {
        this.toDoListService.deleteCompleteTask();
    }

    public changeAllTask(): void {
        this.allCompleteTask = !this.allCompleteTask;
        this.toDoListService.changeAllTask(this.allCompleteTask);
        this.countTaskLeft();
    }

    public addTask(): void {
        this.taskId += 1;
        this.toDoListService.addTask(this.taskName, this.taskId, this.allCompleteTask);
        this.taskName = '';
        this.countTaskLeft();
    }

    public removeTask(taskId: number) {
        this.toDoListService.removeTask(taskId);
    }

    public viewAllTask(): void {
        this.toDoListService.viewAllTask();
    }

    public viewActiveTask(): void {
        this.toDoListService.viewActiveTask();
    }

    public viewCompletedTask(): void {
        this.toDoListService.viewCompletedTask();
    }

    public countTaskLeft(): void {
        this.taskLeft = this.toDoListService.countTaskLeft();
    }

    public changeTaskName(taskData: [string, number]): void {
        this.toDoListService.changeTaskName(taskData);
    }
}
