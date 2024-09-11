import { Component, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { ToDoListService } from './services/to-do-list.service';
import { TaskData } from './types/task';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(public toDoListService: ToDoListService) {}

    title = 'todo';
    taskName: string = '';
    allCompleteTask: boolean = false;
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
        this.taskId = Date.now();
        let task: TaskData = {
            id: this.taskId,
            name: this.taskName,
            completeTask: this.allCompleteTask,
        };
        this.toDoListService.addTask(task);
        this.taskName = '';
        this.countTaskLeft();
        console.log(this.taskId);
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
