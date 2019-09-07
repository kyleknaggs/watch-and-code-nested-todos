(function(){

  var todoList = {
    todos: [],
    add: function(text, indicies){
      var toModify;

      // If this.todos is not an array:
      // The function was definitely not called recursively.
      if(Array.isArray(this.todos) === false){
        toModify = todoList.todos;
      }else{
        toModify = this.todos;
      }

      // Base case:
      if(indicies.length === 0){
        var newTodo = {
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      // Recursive case:
      }else{
        var currentIndex = indicies[0];
        var currentTodo = toModify[currentIndex];
        var remainingIndicies = indicies.slice(1);

        todoList.add.call(currentTodo, text, remainingIndicies);
      }
    },
    remove: function(indicies){
      var toModify;

      // If this.todos is not an array:
      // The function was definitely not called recursively.
      if(Array.isArray(this.todos) === false){
        toModify = todoList.todos;
      }else{
        toModify = this.todos;
      }

      var currentIndex = indicies[0];

      // Base case:
      if(indicies.length === 1){
        toModify.splice(currentIndex, 1);
      // Recursive case:
      }else{
        var currentTodo = toModify[currentIndex];
        var remainingIndicies = indicies.slice(1);

        todoList.remove.call(currentTodo, remainingIndicies);
      }
    }
  };

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList
  };

  window.nestedTodos = nestedTodos;

})();
