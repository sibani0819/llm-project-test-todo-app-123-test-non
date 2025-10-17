// Your JavaScript code here
// Make it functional and interactive
document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo-button');

    let todos = [];

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.setAttribute('data-index', index);
            todoItem.setAttribute('draggable', 'true');
            todoItem.setAttribute('role', 'listitem');

            const todoSpan = document.createElement('span');
            todoSpan.textContent = todo;
            todoSpan.setAttribute('aria-label', 'Todo item: ' + todo);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('aria-label', 'Delete todo item: ' + todo);
            deleteButton.addEventListener('click', () => deleteTodo(index));

            todoItem.appendChild(todoSpan);
            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
        });

        // Add drag and drop functionality after rendering
        addDragAndDrop();
    }

    // Function to add a todo
    function addTodo() {
        const todoText = newTodoInput.value.trim();
        if (todoText !== '') {
            todos.push(todoText);
            newTodoInput.value = '';
            renderTodos();
        }
    }

    // Function to delete a todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    // Drag and Drop functionality
    let draggedIndex = null;

    function addDragAndDrop() {
        const todoItems = document.querySelectorAll('.todo-item');

        todoItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedIndex = parseInt(item.getAttribute('data-index'));
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                draggedIndex = null;
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            item.addEventListener('dragenter', (e) => {
                e.preventDefault();
                const targetIndex = parseInt(item.getAttribute('data-index'));
                if (targetIndex !== draggedIndex) {
                    item.classList.add('drag-over');
                }
            });

            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });

            item.addEventListener('drop', () => {
                item.classList.remove('drag-over');
                const targetIndex = parseInt(item.getAttribute('data-index'));
                if (targetIndex !== draggedIndex) {
                    // Swap elements in the array
                    [todos[draggedIndex], todos[targetIndex]] = [todos[targetIndex], todos[draggedIndex]];
                    renderTodos();
                }
            });
        });
    }

    // Event listeners
    addTodoButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});