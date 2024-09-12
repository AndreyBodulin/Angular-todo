import { Injectable } from '@angular/core';
import { TodoList } from '../types/todo';
import { TaskData } from '../types/task';

@Injectable({
    providedIn: 'root',
})
export class ToDoListService {
    constructor() {}

    todoList: TodoList[] = [];

    public addTask(task: TaskData): void {
        if (task.name) {
            this.todoList.push({
                id: task.id,
                name: task.name,
                completeTask: task.completeTask,
                visible: true,
            });
        }
    }

    public removeTask(taskId: number): void {
        let updateTodoList = this.todoList.filter((task) => task.id !== taskId);
        this.todoList = updateTodoList;
    }

    public countTaskLeft(): number {
        let itemsLeft = this.todoList.filter((obj) => obj.completeTask != true);
        return itemsLeft.length;
    }

    public changeStateTask(taskId: number): void {
        let taskUpdate = this.todoList.find((task) => task.id == taskId);
        if (taskUpdate) taskUpdate.completeTask = !taskUpdate.completeTask;
    }

    public deleteCompleteTask(): void {
        let updateTodoList = this.todoList.filter((task) => task.completeTask == false);
        this.todoList = updateTodoList;
    }

    public changeAllTask(taskCompleted: boolean): void {
        this.todoList.forEach((obj) => {
            obj.completeTask = taskCompleted;
        });
    }

    public viewAllTask(): void {
        this.todoList.forEach((el) => {
            el.visible = true;
        });
    }

    public viewActiveTask(): void {
        this.viewAllTask();
        this.todoList.forEach((el) => {
            if (el.completeTask == true) el.visible = false;
        });
    }

    public viewCompletedTask(): void {
        this.viewAllTask();
        this.todoList.forEach((el) => {
            if (el.completeTask == false) el.visible = false;
        });
    }

    changeTaskName(taskData: [string, number]) {
        let [taskName, taskId] = taskData;
        let taskUpdate = this.todoList.find((task) => task.id == taskId);
        if (taskUpdate) taskUpdate.name = taskName;
    }
}
