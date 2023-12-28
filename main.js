'use strict';

const API_KEY = '50d2199a-42dc-447d-81ed-d68a443b697e';
const API_URL = 'http://tasks-api.std-900.ist.mospolytech.ru/api/tasks';

// Function to create a list item in the DOM
function createItem(task) {
    const list = document.querySelector(`#${task.status}-list`);
    const item = document.getElementById('task-template').cloneNode(true);
    item.querySelector('.task-name').textContent = task.name;
    item.dataset.id = task.id;
    item.querySelector('.task-description').textContent = task.desc;
    item.classList.remove('d-none');
    list.append(item);
}

// Function to fetch tasks from the server
function fetchTasks() {
    fetch(`${API_URL}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                // Handle error display here
            } else {
                console.log(data)
                data.forEach(task => createItem(task));
            }
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for creating a new task
document.querySelector('#create').addEventListener('click', function(event) {
    let modal = event.target.closest('.modal');
    let name = modal.querySelector('#nameTask').value;
    let desc = modal.querySelector('#textTask').value;
    let status = modal.querySelector('#select').value;

    fetch(`${API_URL}?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, desc, status }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error(data.error);
            // Handle error display here
        } else {
            createItem(data);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Function to handle task edit
function editModal(event) {
    let task = event.relatedTarget.closest('.task');
    let id = task.dataset.id;
    let name = task.querySelector('.task-name').textContent;
    let desc = task.querySelector('.task-description').textContent;

    const editModal = document.querySelector('#editModal');
    editModal.querySelector('#editNameTask').value = name;
    editModal.querySelector('#editTextTask').value = desc;

    editModal.querySelector('#save').addEventListener('click', function() {
        fetch(`${API_URL}/${id}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editModal.querySelector('#editNameTask').value, desc: editModal.querySelector('#editTextTask').value }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                // Handle error display here
            } else {
                task.querySelector('.task-name').textContent = data.name;
                task.querySelector('.task-description').textContent = data.desc;
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

document.querySelector('#editModal').addEventListener('show.bs.modal', editModal);

// Function to handle task deletion
function removeModal(event) {
    let task = event.relatedTarget.closest('.task');
    let id = task.dataset.id;

    document.querySelector('#removeModalBtn').addEventListener('click', function() {
        fetch(`${API_URL}/${id}?api_key=${API_KEY}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                // Handle error display here
            } else {
                task.remove();
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

document.querySelector('#removeModal').addEventListener('show.bs.modal', removeModal);

// Load tasks when the window loads
window.onload = function () {
    fetchTasks();
};
