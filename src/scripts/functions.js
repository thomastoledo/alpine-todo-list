
function addTask(task, idList) {
    const tasksList = document.getElementById(idList);
    fetchTaskComponent().then((component) => {
        const p = component.querySelector('p');
        p.innerText = task.label;
        tasksList.appendChild(component);
    })
}

function fetchTaskComponent() {
    return fetch(`./partials/task-component.html`)
        .then(response => response.text())
        .then(html => {
            const section = document.createElement('section');
            section.innerHTML = html;
            return section;
        });
}