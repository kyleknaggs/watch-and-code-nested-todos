(function(){

  var util = {
    getToModify: function(thisArg){
      // If this.todos the function was not called recursively.
      // So the top level list of todos can be returned.
      if (Array.isArray(thisArg.todos) === false) {
        return todoList.todos;
      }

      return thisArg.todos;
    }
  }

  var todoList = {
    todos: [],
    add: function(text, indicies){
      var toModify = util.getToModify(this);

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
    edit: function(text, indicies){
      if(text.length === 0){
        todoList.remove(indicies);
      }else{
        var currentIndex = indicies[0];

        if(indicies.length === 1){
          todoList.todos[currentIndex].text = text;
        }else{
          todoList.todos[currentIndex].todos[indicies[1]].text = text;
        }
      }
    },
    remove: function(indicies){
      var toModify = util.getToModify(this);
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
    todoList,
    util
  };

  window.nestedTodos = nestedTodos;

})();
