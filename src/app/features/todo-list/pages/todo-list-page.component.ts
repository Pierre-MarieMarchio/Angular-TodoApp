import { Component } from '@angular/core';
import { SidBarComponent } from "../../../core/layouts/sid-bar/sid-bar.component";
import { TodoListComponent } from "../components/todo-list/todo-list.component";
import { TodoInputComponent } from "../components/todo-input/todo-input.component";

@Component({
  selector: 'app-todo-list-page',
  imports: [ SidBarComponent, TodoListComponent, TodoInputComponent],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss'
})
export class TodoListPageComponent {

}
