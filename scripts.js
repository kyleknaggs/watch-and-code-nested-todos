(function(){

  var todoList = {
    todos: [],
    add: function (text) {
      var newTodo = {
        text: text,
        todos: []
      }

      todoList.todos.push(newTodo);
    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
