(function(){

  var todoList = {
    todos: [],
    add: function (text, indicies) {
      var toModify;

      // All recursive calls will have an array in the 'todos' key:
      if(Array.isArray(this.todos) === false){
        toModify = todoList.todos;
      }else{
        toModify = this.todos;
      }

      if (indicies.length === 0) {
        // Base case:
        var newTodo = {
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      } else {
        // Recursive case:
        var currentIndex = indicies[0];
        var currentTodo = toModify[currentIndex];
        var remainingIndicies = indicies.slice(1);

        todoList.add.call(currentTodo, text, remainingIndicies);
      }
    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
