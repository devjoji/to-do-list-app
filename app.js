// Get references to the necessary HTML elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.querySelector('.clear-all-btn');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task);
    });
});

// Add a task when the user presses the Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a task
function addTask(taskText) {
    // If no task text is provided, use the value from the input field
    if (!taskText) {
        taskText = taskInput.value.trim();
    }

    // If the task text is empty, return without adding a task
    if (taskText === '') {
        return;
    }

    // Create a new list item (li) and set its inner HTML
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
        <button class="cross-out-btn">Cross Out</button>
        <button class="edit-btn">Edit</button>
        <input type="text" class="edit-input" placeholder="Edit task..." style="display: none;">
    `;

    // Append the new list item to the task list
    taskList.appendChild(li);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Clear the input field
    taskInput.value = '';
}

// Handle click events on the task list
taskList.addEventListener('click', function (e) {
    // If the clicked element has the 'delete-btn' class, delete the task
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }

    // If the clicked element has the 'cross-out-btn' class, cross out the task
    else if (e.target.classList.contains('cross-out-btn')) {
        e.target.parentElement.querySelector('span').classList.toggle('completed');
    }

    // If the clicked element has the 'edit-btn' class, enable editing for the task
    else if (e.target.classList.contains('edit-btn')) {
        const span = e.target.parentElement.querySelector('span');
        const input = e.target.parentElement.querySelector('.edit-input');
        span.style.display = 'none';
        input.style.display = 'inline-block';
        input.value = span.innerText;
        input.focus();
    }
});

// Handle keypress events on the task list
taskList.addEventListener('keypress', function (e) {
    // If the Enter key is pressed and the clicked element has the 'edit-input' class, save the edited task and disable editing
    if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
        const span = e.target.parentElement.querySelector('span');
        span.innerText = e.target.value;
        span.style.display = 'inline-block';
        e.target.style.display = 'none';

        // Save tasks to local storage
        saveTasksToLocalStorage();
    }
});

// Function to clear all tasks
clearAllBtn.addEventListener('click', function () {
    taskList.innerHTML = '';

    // Save tasks to local storage
    saveTasksToLocalStorage();
});

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.querySelector('span').innerText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}