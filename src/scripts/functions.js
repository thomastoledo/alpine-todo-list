
function addTask(task, tasks) {
    const res = [...tasks, {...task}];
    task.label = '';
    return res;
}

function tasksToHTML(tasks, templateId) {
    const template = document.getElementById(templateId);
    return tasks.map((task) => {
        const taskSection = document.importNode(template.content.querySelector('.task'), true);
        const p = taskSection.querySelector('p');
        p.innerText = task.label;
        return taskSection.outerHTML;
    }).reduce((acc, curr) => acc + curr, '');
}  

/**
 * @returns the task component
 */
async function fetchTaskComponent() {
    return await fetch(`./partials/task-component.html`)
        .then(response => response.text())
        .then(html => {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.firstChild;
        });
}