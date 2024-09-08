document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTaskButton.click();
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete">Delete</button>
        `;
        li.querySelector('span').addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });
        li.querySelector('.delete').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="delete">Delete</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.querySelector('span').addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTasks();
            });
            li.querySelector('.delete').addEventListener('click', function() {
                li.remove();
                saveTasks();
            });
            taskList.appendChild(li);
        });
    }
});
