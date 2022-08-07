'use strict';
import { todoAppSelectors, localStorageProps } from './constants/constants.js';
import { Todo } from './Todo/Todo.js';

const todo = new Todo(todoAppSelectors, localStorageProps);

todo.setSubmitEventListener();
todo.renderTodoListFromStorage();
todo.handleTodoItemAction();
