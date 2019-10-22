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
          var id = beforeCurrentIndex + currentIndex;

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
      // Add single event listener to modifyTodosUI:
      var modifyTodosUI = document.querySelector('#modifyTodosUI');
      modifyTodosUI.addEventListener('click', view.handleClick);

      // Render todos:
      var todos = todoList.todos;
      var renderedTodos = document.createElement('div');

      view.renderTodos(todos, renderedTodos);

      // Replace old UI with new UI:
      var main = document.querySelector('#main');

      main.innerHTML = "";
      main.append(renderedTodos);
    },
    handleClick: function(e){
      var target = e.target;
      var tagName = target.tagName;

      if(tagName === "BUTTON"){
        var addIndices = document.querySelector('#addIndices');
        var addText = document.querySelector('#addText');
        var addIndicesValue = addIndices.value;
        var addTextValue = addText.value;
        var indices = util.getIndices(addIndicesValue);
        var text = util.getText(addTextValue);

        // Only accept valid user inputs:
        if(indices && text){
          console.log('User has entered a non-empty string.');
        }else{
          console.log('User inputs are not valid.');
        }

      }
    },
    renderTodos: function(todos, parentElement){
      var numberOfTodos = todos.length;

      if(numberOfTodos > 0){
        var ul = document.createElement('ul');

        for(var i=0; i<numberOfTodos; i++){
          var currentTodo = todos[i];
          var currentTodoText = currentTodo.text;
          var currentTodoId = currentTodo.id;
          var currentTodoCompleted = currentTodo.completed;
          var nestedTodos = currentTodo.todos;
          var numberOfNestedTodos = nestedTodos.length;
          var li = document.createElement('li');
          var p = document.createElement('p');

          p.textContent = currentTodoText;
          li.setAttribute('id', currentTodoId);

          if(currentTodoCompleted){
            li.setAttribute('class', 'completed');
          }

          // Append p to li before appending li to ul:
          li.append(p);

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
  };

  var util = {
    getIndices: function(value){
      var trimmed = value.trim();
      var firstCharacter = trimmed[0];
      var lastCharacter = trimmed[trimmed.length - 1];

      // If user has not properly formatted indices array:
      if(firstCharacter !== "[" || lastCharacter !== "]"){
        throw new Error('Indices array has not been properly formatted');
      }

      var withoutBrackets = trimmed.slice(1, trimmed.length - 1);
      var listOfNumbers = [];

      // If the array is not empty:
      // "".split(",") ==> [""] is not desired.
      if(withoutBrackets.length > 0){
        var listOfStrings = withoutBrackets.split(',');

        listOfNumbers = listOfStrings.map(function(string){
          return Number(string);
        });
      }

      // If listOfNumbers contains a single non-integer or isNaN value:
      listOfNumbers.forEach(function(value){
        var isInteger = Number.isInteger(value);
        var isNumber = !isNaN(value);

        if(!isInteger || !isNumber){
          throw new Error('Values in indices array have not been properly formatted');
        }
      });

      return listOfNumbers;
    },
    getText(value){
      var trimmed = value.trim();

      return trimmed;
    },
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
