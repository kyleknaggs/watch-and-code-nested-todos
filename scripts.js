(function(){

  var todoList = {
    todos: [],
    add: function (text, id) {
      var newTodo = {
        text: text,
        todos: []
      }

      // Get list of todos:
      var todos = todoList.todos;

      // If an id is provided, nest the todo:
      if(arguments.length === 1){
        todos.push(newTodo);
      }else{
        todos[id].todos.push(newTodo);
      }

    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
