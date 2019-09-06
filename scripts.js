(function(){

  var todoList = {
    todos: [],
    add: function (text, indicies) {
      var toModify;

      // If this.todos is not an array:
      // The function was definitely not called recursively.
      if(Array.isArray(this.todos) === false){
        toModify = todoList.todos;
      }else{
        toModify = this.todos;
      }

      // Base case:
      if (indicies.length === 0) {
        var newTodo = {
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      // Recursive case:
      } else {
        var currentIndex = indicies[0];
        var currentTodo = toModify[currentIndex];
        var remainingIndicies = indicies.slice(1);

        todoList.add.call(currentTodo, text, remainingIndicies);
      }
    },
    remove: function(indicies){
      var length = indicies.length;
      var firstIndex = indicies[0];
      var todos = todoList.todos;

      // Remove normal todo:
      if(length === 1){
        todos.splice(firstIndex, 1);
      // Remove nested todo:
      }else{
        var secondIndex = indicies[1];
        todos[firstIndex].todos.splice(secondIndex, 1);
      }
    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
