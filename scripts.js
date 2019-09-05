(function(){

  var todoList = {
    todos: [],
    add: function (text, indicies) {

      var computedIndicies = [];

      if(arguments.length > 1){
        if(typeof(indicies) === "number"){
          computedIndicies = [indicies]
        }else{
          computedIndicies = indicies;
        }
      }

      var toModify;

      // Manually set this when calling recursively.
      // Guarantees all recursive calls will have a todos key.
      if (this.todos) {
        toModify = this.todos;
      } else {
        toModify = todoList.todos;
      }

      if (computedIndicies.length === 0) {
        // Base case:
        var newTodo = {
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      } else {
        // Recursive case:
        var currentIndex = computedIndicies[0];
        var currentTodo = toModify[currentIndex];
        var remainingIndicies = computedIndicies.slice(1);

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
