import { Component } from '@angular/core';
import { SidBarComponent } from "../../../core/layouts/sid-bar/sid-bar.component";
import { TodoListComponent } from "../components/todo-list/todo-list.component";
import { TodoInputComponent } from "../components/todo-input/todo-input.component";
import { TabBarComponent } from "../components/tab-bar/tab-bar.component";

@Component({
  selector: 'app-todo-list-page',
  imports: [SidBarComponent, TodoListComponent, TodoInputComponent, TabBarComponent],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss'
})
export class TodoListPageComponent {

}
