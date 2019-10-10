// Helper function intended to restore application to original state after a test has been run:
(function(){
  var resetAfterTest = function(){
    // Reset todos to [] after each test:
    nestedTodos.todoList.todos=[];

    // Reset UI to original state:
    var main = document.querySelector('#main');
    main.innerHTML = "";
  }

  // Attach the application to the browser window:
  window.resetAfterTest = resetAfterTest;

})();