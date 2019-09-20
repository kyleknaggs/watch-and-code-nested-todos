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
    add: function(text, indices){
      var toModify = util.getToModify(this);

      // Base case:
      if(indices.length === 0){
        var idOfParentTodo = '';

        // If call is recursive:
        if(toModify !== todoList.todos){
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

        todoList.add.call(currentTodo, text, remainingindices);
      }
    },
    edit: function(text, indices){
      if(text.length === 0){
        todoList.remove(indices);
      }else{
        var toModify = util.getToModify(this);
        var currentIndex = indices[0];
        var currentTodo = toModify[currentIndex];

        // Base case:
        if(indices.length === 1){
          currentTodo.text = text;
        // Recursive case:
        }else{
          var remainingindices = indices.slice(1);
          todoList.edit.call(currentTodo, text, remainingindices);
        }
      }
    },
    remove: function(indices){
      var toModify = util.getToModify(this);
      var currentIndex = indices[0];

      // Base case:
      if(indices.length === 1){
        toModify.splice(currentIndex, 1);
      // Recursive case:
      }else{
        var currentTodo = toModify[currentIndex];
        var remainingindices = indices.slice(1);

        todoList.remove.call(currentTodo, remainingindices);
      }
    },
    toggle: function(indices){
      var toModify = util.getToModify(this);
      var currentIndex = indices[0];
      var currentTodo = toModify[currentIndex];

      // Base case:
      if(indices.length === 1){
        currentTodo.completed = !currentTodo.completed;
      // Recursive case:
      }else{
        var remainingindices = indices.slice(1);

        todoList.toggle.call(currentTodo, remainingindices);
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
