import { Injectable } from '@angular/core';
import{Todo} from '../classes/todo';


@Injectable()
//   {providedIn: 'root'
// }  )
export class TodoService {
  // private todos:Todo[];
  private nextId : number;

  constructor()   { 
  
    let todos=this.getTodos();
    // this.todos=[
    //   new Todo(0,"Make dinner Tonight!"),
    //   new Todo(1,"take a power nap"),
    //   new Todo(2,"Learn to make angular app"),
    // ];
    // this.nextId=3;

    if (todos.length == 0) {
      this.nextId = 0;
    } else {
      let maxId=todos[todos.length -1].id;
      this.nextId=maxId+1;  
    }
  }

  public addTodo(text:string):void{
    let todo=new Todo(this.nextId, text);
    // this.todos.push(todo);
    let todos=this.getTodos();
    todos.push(todo);

    this.setLocalStorageTodos(todos);
    this.nextId++;
  }

  public getTodos(): Todo[] {
    // return this.todos;
    let localStorageItem=JSON.parse(localStorage.getItem('todos'));
    return localStorageItem==null?[]:localStorageItem.todos;
  }
  public removeTodo(id:number): void{
    let todos=this.getTodos();
    // this.todos=this.todos.filter((todo) => todo.id !== id);
    todos=todos.filter((todo) => todo.id !=id);
    this.setLocalStorageTodos(todos);

  } 
  private setLocalStorageTodos(todos: Todo[]):void{
    localStorage.setItem('todos',JSON.stringify({todos:todos}));   

  }
  

}
