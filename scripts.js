(function(){

  var todoList = {
    todos: [],
    add: function (text) {
      todoList.todos.push(text);
    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
