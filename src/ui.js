import { deleteTask } from "./storage.js";


export function createTask(text, hour, id){
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task'
    taskDiv.id = 'task'+ id

    let taskContent = document.createElement('div');
    taskContent.className = 'content'
    taskContent.id = 'content'+ id

    let taskText = document.createElement('span');
    taskText.className = 'task-text'
    taskText.innerHTML = text
    taskText.id = 'task-text'+ id

    let taskHour = document.createElement('span');
    taskHour.className = 'hour'
    taskHour.innerHTML = hour;
    taskHour.id = 'hour'+ id

    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container'
    buttonContainer.id = 'button-container'+ id

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete'
    deleteButton.id = 'delete'+ id

    deleteButton.addEventListener('click', async (e)=>{   
        await deleteTask(id);
        const thisTask = document.querySelector(`#task${id}`)
        thisTask.remove();
        
    })

    let editButton = document.createElement('button');
    editButton.className = 'edit'
    editButton.id = 'edit'+ id

    let doneButton = document.createElement('button');
    doneButton.className = 'done'
    doneButton.id = 'done'+ id

    taskDiv.appendChild(taskContent);
    taskContent.appendChild(taskText);
    taskContent.appendChild(taskHour);

    taskDiv.appendChild(buttonContainer);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(doneButton);

    return taskDiv;
}

