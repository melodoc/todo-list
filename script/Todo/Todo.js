import { generateKey } from '../utils/generateKey.js';

export class Todo {
    constructor({ form, input, todoList, todoListCompleted }, { localStorageItem }) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoListCompleted = document.querySelector(todoListCompleted);

        this.localStorageItem = localStorageItem;
        this.todoData = new Map(JSON.parse(localStorage.getItem(localStorageItem)));
    }

    setLocalStorageData() {
        localStorage.setItem(this.localStorageItem, JSON.stringify([...this.todoData]));
    }

    renderTodoListFromStorage() {
        this.resetTodoListContent();
        this.todoData.forEach(this.createItem, this);
        this.setLocalStorageData();
    }

    resetTodoListContent() {
        this.todoList.textContent = '';
        this.todoListCompleted.textContent = '';
    }

    createItem(todo) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        listItem.key = todo.key;
        const markUp = this.getListItemMarkUpWithText(todo.value);
        this.insertHTMLBeforeClosingTag(listItem, markUp);

        if (todo.completed) {
            this.todoListCompleted.append(listItem);
        } else {
            this.todoList.append(listItem);
        }
    }

    getListItemMarkUpWithText(text) {
        return `<span class="text-todo">${text}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;
    }

    insertHTMLBeforeClosingTag(item, markup) {
        item.insertAdjacentHTML('beforeend', markup);
    }

    addTodoItem(event) {
        event.preventDefault();

        if (this.input.value) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.renderTodoListFromStorage();
            this.input.value = '';
        } else {
            alert('No empty todos');
        }
    }

    deleteItem(key) {
        this.todoData.delete(key);
        this.renderTodoListFromStorage();
    }

    completedItem(targetKey) {
        this.todoData.forEach((value, key) => {
            if (targetKey === key && value.completed === false) {
                value.completed = true;
            } else if (targetKey === key && value.completed === true) {
                value.completed = false;
            }
        });

        this.renderTodoListFromStorage();
    }

    handleTodoItemAction() {
        document.querySelector('.todo-container').addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;

            if (target.matches('.todo-complete')) {
                target.key = target.closest('.todo-item').key;
                this.completedItem(target.key);
            } else if (target.matches('.todo-remove')) {
                target.key = target.closest('.todo-item').key;
                this.deleteItem(target.key);
            }
        });
    }

    setSubmitEventListener() {
        this.form.addEventListener('submit', this.addTodoItem.bind(this));
    }
}
