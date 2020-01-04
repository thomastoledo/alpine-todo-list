
function addTask(task, tasks) {
    return [...tasks, {...task}]
}

function displayTasks(tasks, domTasks) {
    fetchTaskComponent().then((component) => {
        tasks.forEach((task) => {
            const p = component.querySelector('p');
            p.innerText = task.label;
            domTasks.appendChild(component);
            task.label = '';
        })
    })
}  

/**
 * @returns the task component
 */
function fetchTaskComponent() {
    return fetch(`./partials/task-component.html`)
        .then(response => response.text())
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.firstChild;
        });
}