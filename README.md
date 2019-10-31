Watch and Code Beasts - Nested Todos
=======================================

Create an application that houses a small todo list.
Much like a typical todo list, this application should be able to:

1) Add todos
2) Delete todos
3) Edit todos
4) Complete todos

However, in addition to this functionality this todo list has 1 special feature.
The special feature of this todo list is that every todo in this list should be able to have its own "nested" todo.
This means that each todo should be able to hold an unnlimited number of nested todos.

Example of a normal todo list:
- First todo
- Second todo

Example of a nested todo list:
- First todo
  - First nested todo

For additional inspiration visit Workflowy:
https://workflowy.com/demo/embed/

Solutions should be posted here:
https://github.com/gordonmzhu/beasts/issues/11

## Structure of the Application:

All files listed here are located within the root directory of the application.

- index.html - All of the HTML  associated with the application.
- scripts.js - All of the JavaScript associated with the application.
- styles.css - All of the CSS  associated with the application.

## Structure of the Application's Tests:

All files listed here are located within the /_tests directory of the application.

- _tests/helper.js - A helper function that resets the application markup. It is run after any test that changes the application markup from its original state.
- _tests/simpletest.js - A modified version of the TinyTest testing framework that is used when testing the application.
- _tests/todoList.html - All of the tests associated with the todoList object.
- _tests/util.html - All of the tests associated with the util object.
- _tests/view.html - All of the tests associated with the view object.
