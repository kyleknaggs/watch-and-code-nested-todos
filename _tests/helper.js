// Helper function intended to restore application to original state after a test has been run:
(function(){
  var emptyTodos = function(){
    // Reset todos to [] after each test:
    nestedTodos.todoList.todos=[];
  }

  // Attach the application to the browser window:
  window.emptyTodos = emptyTodos;

})();