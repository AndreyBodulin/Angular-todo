import { Component, EventEmitter, HostListener, ElementRef, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }
  @Input() completeTask : boolean = false;
  @Input() taskName : string = "";
  @Input() id : number = 0;
  @Output() delTaskId = new EventEmitter<number>();
  @Output() countTaskLeft = new EventEmitter();
  @Output() changeStateTask = new EventEmitter();
  @Output() changeTaskName = new EventEmitter();
  readOnly: boolean = true;

  public removeTask():void{
    this.delTaskId.emit(this.id);
    this.countTaskLeft.emit();
  }

  public changeTask():void{
    this.changeStateTask.emit(this.id);
    this.countTaskLeft.emit();
  }

  public getRead() {
    this.readOnly = true;
    this.changeTaskName.emit([this.taskName, this.id]);
  }

  public getWrite() {
    this.readOnly = false;
  } 

  @HostListener('document:click', ["$event"])
  clickOutside(event:any){
    if (!this.eRef.nativeElement.contains(event.target)){
      this.getRead()
    }
  }
}
