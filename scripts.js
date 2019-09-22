(function(){

  var util = {
    getToModify: function(isRecursive, thisArg){
      if (!isRecursive) {
        return todoList.todos;
      }

      return thisArg.todos;
    }
  }

  var todoList = {
    todos: [],
    add: function(text, indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);

      // Base case:
      if(indices.length === 0){
        var idOfParentTodo = '';

        // If call is recursive:
        if(isRecursive){
          idOfParentTodo = this.id + '-';
        }

        var indexOfNewTodo = String(toModify.length);
        var idOfNewTodo = idOfParentTodo + indexOfNewTodo;
        var newTodo = {
          completed: false,
          id: idOfNewTodo,
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      // Recursive case:
      }else{
        var currentIndex = indices[0];
        var currentTodo = toModify[currentIndex];
        var remainingindices = indices.slice(1);
        todoList.add.call(currentTodo, text, remainingindices, true);
      }
    },
    edit: function(text, indices, isRecursive){
      if(text.length === 0){
        todoList.remove(indices);
      }else{
        var toModify = util.getToModify(isRecursive, this);
        var currentIndex = indices[0];
        var currentTodo = toModify[currentIndex];

        // Base case:
        if(indices.length === 1){
          currentTodo.text = text;
        // Recursive case:
        }else{
          var remainingindices = indices.slice(1);
          todoList.edit.call(currentTodo, text, remainingindices, true);
        }
      }
    },
    remove: function(indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);
      var currentIndex = indices[0];

      // Base case:
      if(indices.length === 1){
        toModify.splice(currentIndex, 1);
      // Recursive case:
      }else{
        var currentTodo = toModify[currentIndex];
        var remainingindices = indices.slice(1);
        todoList.remove.call(currentTodo, remainingindices, true);
      }
    },
    toggle: function(indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);
      var currentIndex = indices[0];
      var currentTodo = toModify[currentIndex];

      // Base case:
      if(indices.length === 1){
        currentTodo.completed = !currentTodo.completed;
      // Recursive case:
      }else{
        var remainingindices = indices.slice(1);
        todoList.toggle.call(currentTodo, remainingindices, true);
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
