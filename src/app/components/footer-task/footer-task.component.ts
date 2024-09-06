import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer-task',
  templateUrl: './footer-task.component.html',
  styleUrls: ['./footer-task.component.scss']
})
export class FooterTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() itemsLeft: number = 0;
  @Output() deleteCompleteTask = new EventEmitter();
  @Output() allTask = new EventEmitter();
  @Output() activeTask = new EventEmitter();
  @Output() completedTask = new EventEmitter();

  public removeTask(){
    this.deleteCompleteTask.emit();
  }

  public chooseAllTask() {
    this.allTask.emit();
  }

  public chooseActiveTask() {
    this.activeTask.emit();
  }

  public chooseCompletedTask(){
    this.completedTask.emit();
  }

}
