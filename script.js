// app.js
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', manageTask);

    // Load tasks from local storage
    loadTasks();

    function addTask(event) {
        event.preventDefault();

        if (taskInput.value === '') return;

        createTaskElement(taskInput.value);
        saveTaskToLocal(taskInput.value);

        taskInput.value = '';
    }

    function manageTask(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskItem = event.target.parentNode.parentNode;
            deleteTaskFromLocal(taskItem.textContent.slice(0, -12));
            taskItem.remove();
        } else if (event.target.classList.contains('complete-btn')) {
            const taskItem = event.target.parentNode.parentNode;
            taskItem.classList.toggle('completed');
        }
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `${task} <div class="task-buttons">
                            <button class="complete-btn">Complete</button>
                            <button class="delete-btn">Delete</button>
                        </div>`;
        taskList.appendChild(li);
    }

    function saveTaskToLocal(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    function deleteTaskFromLocal(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});