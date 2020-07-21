

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const saveToLocalStorage = function() {
    localStorage.setItem('key', JSON.stringify(todoData));
};

let todoData = [];

const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', () => {
            item.completed = !item.completed;
            saveToLocalStorage();
            render();
        });

        const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', () => {
            const index = todoData.indexOf(item);
            todoData.splice(index, 1);
            saveToLocalStorage();
            render();
        });
    });
};

todoControl.addEventListener('submit', event => {
    event.preventDefault();

    const newToDo = {
        value: headerInput.value,
        completed: false,
    };

    if (headerInput.value.trim() !== '') {
        todoData.push(newToDo);
        saveToLocalStorage();
    }

    headerInput.value = '';

    render();
});

if (localStorage.getItem('key')) {
    todoData = JSON.parse(localStorage.getItem('key'));
    render();
}
