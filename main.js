window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach((taskText) => {
        createTask(taskText);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        createTask(task);

        savedTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        input.value = '';
    });

    function createTask(taskText) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        task_el.style.opacity = '0';
		task_el.style.transition = 'opacity 1s'; 
        setTimeout(() => {
            task_el.style.opacity = '1';
        }, 0); 

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = '編輯';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = '刪除';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        let isEditing = false;

        task_edit_el.addEventListener('click', () => {
            if (!isEditing) {
                isEditing = true;
                task_edit_el.innerText = "儲存";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                isEditing = false;
                task_edit_el.innerText = "編輯";
                task_input_el.setAttribute("readonly", "readonly");

                const index = savedTasks.indexOf(taskText);
                if (index !== -1) {
                    savedTasks[index] = task_input_el.value;
                    localStorage.setItem('tasks', JSON.stringify(savedTasks));
                }
            }
        });

        task_delete_el.addEventListener('click', () => {
            task_el.style.opacity = '0';

            setTimeout(() => {
                list_el.removeChild(task_el);

                const index = savedTasks.indexOf(taskText);
                if (index !== -1) {
                    savedTasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(savedTasks));
                }
            }, 1000); 
        });
    }
});
