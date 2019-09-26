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
    resetIds: function(indexRemoved, toModify){
      var length = toModify.length;

      // If there are still todos
      // And the last todo was not the one that was removed
      if(length > 0 && indexRemoved !== length){
        var firstId = toModify[0].id;
        var indexAfterDash = firstId.lastIndexOf("-") + 1;
        var beforeCurrentIndex = firstId.slice(0, indexAfterDash);

        // Reset the id of every todo starting at indexRemoved:
        for(var i = indexRemoved; i<length; i++){
          var currentIndex = String(i);
          var id = beforeCurrentIndex + currentIndex
          toModify[i].id = id;
        }
      }
    },
    add: function(text, indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);

      // Base case:
      if(indices.length === 0){
        var id = String(toModify.length);

        if(isRecursive){
          var parentId = this.id;
          id = parentId + '-' + id;
        }

        var newTodo = {
          completed: false,
          id: id,
          text: text,
          todos: []
        };

        toModify.push(newTodo);
      // Recursive case:
      }else{
        var currentIndex = indices[0];
        var currentTodo = toModify[currentIndex];
        var remainingIndices = indices.slice(1);
        todoList.add.call(currentTodo, text, remainingIndices, true);
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
          var remainingIndices = indices.slice(1);
          todoList.edit.call(currentTodo, text, remainingIndices, true);
        }
      }
    },
    remove: function(indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);
      var currentIndex = indices[0];

      // Base case:
      if(indices.length === 1){
        toModify.splice(currentIndex, 1);
        todoList.resetIds(currentIndex, toModify);
      // Recursive case:
      }else{
        var currentTodo = toModify[currentIndex];
        var remainingIndices = indices.slice(1);
        todoList.remove.call(currentTodo, remainingIndices, true);
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
        var remainingIndices = indices.slice(1);
        todoList.toggle.call(currentTodo, remainingIndices, true);
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
