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
    add: function(indices, text, isRecursive){
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

        util.confirmIndex(currentIndex, toModify);

        var currentTodo = toModify[currentIndex];
        var remainingIndices = indices.slice(1);

        todoList.add.call(currentTodo, remainingIndices, text, true);

      }
    },
    edit: function(indices, text, isRecursive){
      var toModify = util.getToModify(isRecursive, this);
      var currentIndex = indices[0];
      var currentTodo = toModify[currentIndex];

      util.confirmIndex(currentIndex, toModify);

      // Base case:
      if(indices.length === 1){
        currentTodo.text = text;
        view.render();
      // Recursive case:
      }else{
        var remainingIndices = indices.slice(1);

        todoList.edit.call(currentTodo, remainingIndices, text, true);
      }
    },
    remove: function(indices, isRecursive){
      var toModify = util.getToModify(isRecursive, this);
      var currentIndex = indices[0];

      util.confirmIndex(currentIndex, toModify);

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

      util.confirmIndex(currentIndex, toModify);

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
      // Add a single event listener to modifyTodos:
      var modifyTodos = document.querySelector('#modifyTodos');

      modifyTodos.addEventListener('click', view.handleClick);

      // Generate markup and replace old todos with new todos:
      var todos = todoList.todos;
      var renderedTodos = document.createElement('div');
      var displayTodos = document.querySelector('#displayTodos');

      view.renderTodos(todos, renderedTodos);
      displayTodos.innerHTML = "";
      displayTodos.append(renderedTodos);
    },
    handleClick: function(e){
      // There are no tests for handleClick().
      // Because of this, handleClick() needs to be checked manually.
      // Making handleClick() testable would have involved re-building modifyTodos using JS.
      // Because of the limited educational value in this process the decision was made to move on.
      var target = e.target;
      var tagName = target.tagName;

      if(tagName === "BUTTON"){
        var textContent = target.textContent;
        var indicesInput;
        var textInput;
        var modifier;

        // Target inputs and configure modifier:
        if(textContent === 'Add'){
          indicesInput = document.querySelector('#addIndices');
          textInput = document.querySelector('#addText');
          modifier = todoList.add;
        }

        if(textContent === 'Edit'){
          indicesInput = document.querySelector('#editIndices');
          textInput = document.querySelector('#editText');
          modifier = todoList.edit;
        }

        if(textContent === 'Toggle'){
          indicesInput = document.querySelector('#toggleIndices');
          modifier = todoList.toggle;
        }

        if(textContent === 'Remove'){
          indicesInput = document.querySelector('#removeIndices');
          modifier = todoList.remove;
        }

        // Extract values from inputs:
        var indicesValue = indicesInput.value;
        var indices = util.getIndices(indicesValue);
        var text;

        if(textInput){
          var textValue = textInput.value;
          text = util.getText(textValue);
        }

        modifier(indices, text);
        indicesInput.value = "";

        if(textInput){
          textInput.value = "";
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
          var text = currentTodoId + ': ' + currentTodoText;

          p.textContent = text;
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
    confirmIndex: function(index, array){
      var hasIndex = index in array;

      if(!hasIndex){
        throw new Error("Index in array does not exist");
      }
    },
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

      if(trimmed.length === 0){
        throw new Error('Value in text input is empty');
      }

      return trimmed;
    },
    getToModify: function(isRecursive, thisArg){
      if (!isRecursive) {
        return todoList.todos;
      }

      return thisArg.todos;
    }
  };

  // Render the application when the page is loaded:
  view.render();

  // Attach application code to a single key of the window object:
  // This makes it easy to test application code in console.
  var nestedTodos = {
    todoList,
    util,
    view
  };

  // Attach the application to the browser window:
  window.nestedTodos = nestedTodos;

})();
