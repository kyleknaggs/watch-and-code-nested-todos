(function(){

  var todoList = {
    todos: [],
    resetIds: function(indexRemoved, toModify){
      var length = toModify.length;

      // If the todo that was removed was not the last:
      // Reset the id of every todo starting after the one that was removed
      if(indexRemoved !== length){
        var firstId = toModify[0].id;
        var indexAfterDash = firstId.lastIndexOf("-") + 1;
        var beforeCurrentIndex = firstId.slice(0, indexAfterDash);

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
        var currentIndex = String(toModify.length);
        var beforeCurrentIndex = '';

        if(isRecursive){
          beforeCurrentIndex = this.id + '-';
        }

        var id = beforeCurrentIndex + currentIndex;
        var newTodo = {
          completed: false,
          id: id,
          text: text,
          todos: []
        };

        toModify.push(newTodo);
        view.render();
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
          view.render();
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
        view.render();
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
        view.render();
      // Recursive case:
      }else{
        var remainingIndices = indices.slice(1);
        todoList.toggle.call(currentTodo, remainingIndices, true);
      }
    }
  };

  var view = {
    render: function(){
      // Render todos:
      var todos = todoList.todos;
      var renderedTodos = document.createElement('div');
      view.renderTodos(todos, renderedTodos);

      // Replace old UI with new UI:
      var main = document.querySelector('#main');
      main.innerHTML = "";
      main.append(renderedTodos);
    },
    // New renderTodos() with <p>:
    renderTodos: function(todos, parentElement){}
    /*
    // Old renderTodos() without <p>:
    renderTodos: function(todos, parentElement){
      var numberOfTodos = todos.length;

      if(numberOfTodos > 0){
        var ul = document.createElement('ul');

        for(var i=0; i< numberOfTodos; i++){
          var currentTodo = todos[i];
          var currentTodoText = currentTodo.text;
          var currentTodoId = currentTodo.id;
          var currentTodoCompleted = currentTodo.completed;
          var nestedTodos = currentTodo.todos;
          var numberOfNestedTodos = nestedTodos.length;
          var li = document.createElement('li');

          li.textContent = currentTodoText;
          li.id = currentTodoId;

          if(currentTodoCompleted){
            li.setAttribute('class', 'completed');
          }

          // Base case does not enter conditional statement.
          // Recursive case:
          if(numberOfNestedTodos > 0){
            view.renderTodos(nestedTodos, li);
          }

          ul.append(li);
        }

        parentElement.append(ul);
      }
    }
    */
  };

  var util = {
    getToModify: function(isRecursive, thisArg){
      if (!isRecursive) {
        return todoList.todos;
      }

      return thisArg.todos;
    }
  };

  // Render the application when the page is loaded:der t
  view.render();

  // Attach application code to a single key of the window object:
  var nestedTodos = {
    todoList,
    util,
    view
  };

  // Attach the application to the browser window:
  window.nestedTodos = nestedTodos;

})();
