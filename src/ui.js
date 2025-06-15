import { deleteTask, editTask } from "./storage.js";


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

    editButton.addEventListener('click', (e)=>{
        const thisText = document.querySelector(`#task-text${id}`)
        const thisHour = document.querySelector(`#hour${id}`)

        thisText.remove();
        thisHour.remove();
        deleteButton.remove()
        editButton.remove()
        doneButton.remove()

        let textInput = document.createElement('input')
        textInput.className = 'editInput';
        textInput.value = text;    

        let uselessInvisibleButton = document.createElement('button');
        uselessInvisibleButton.style.background = 'transparent'
        uselessInvisibleButton.style.border = 'none'
        
        let newTaskText;

        let confirmEditButton = document.createElement('button');
        confirmEditButton.className = 'done'
        confirmEditButton.addEventListener('click', async(e)=>{
            
            newTaskText = textInput.value;

            taskText.innerHTML = newTaskText
            textInput.remove()
            taskHour.remove()
            uselessInvisibleButton.remove()
            confirmEditButton.remove()
            cancelEditButton.remove()

            taskContent.appendChild(taskText);
            taskContent.appendChild(taskHour);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(doneButton);

            await editTask(id, newTaskText);
        })

        let cancelEditButton = document.createElement('button');
        cancelEditButton.className = 'delete'
        cancelEditButton.addEventListener('click', (e)=>{
            textInput.remove()
            taskHour.remove()
            uselessInvisibleButton.remove()
            confirmEditButton.remove()
            cancelEditButton.remove()

            taskContent.appendChild(taskText);
            taskContent.appendChild(taskHour);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(doneButton);

        })

        
        taskContent.appendChild(textInput);
        taskContent.appendChild(taskHour);

        buttonContainer.appendChild(cancelEditButton);
        buttonContainer.appendChild(uselessInvisibleButton);
        buttonContainer.appendChild(confirmEditButton);

        textInput.focus()

        
    })

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

