import { deleteTask, editTask } from "./storage.js";
import { URL } from "./storage.js";




export function createTask(text, hour, id, dataHour, dataMinutes){
    let taskDiv = document.createElement('div');
    taskDiv.className = 'task'
    taskDiv.id = 'task'+ id
    taskDiv.draggable = 'true';
    taskDiv.dataset.id = id;
    taskDiv.dataset.hour = dataHour;
    taskDiv.dataset.minutes = dataMinutes;


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

export async function dragTasks(){
    try{

        const columns = document.querySelectorAll('.week-day');
        
        document.addEventListener('dragstart',(e)=>{
            const draggingEl = e.target;
            draggingEl.classList.add('dragging');

            const taskId = draggingEl.dataset.id;

        })

        document.addEventListener('dragend', async (e)=>{
            const dragging = e.target;
            dragging.classList.remove('dragging');

            const id = dragging.dataset.id;
            const newWeekDay = dragging.parentElement.id;

                await fetch(`${URL}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({weekDay : newWeekDay}),
            })


        })
        
        columns.forEach((column)=>{
            column.addEventListener('dragover', async (e)=>{
                e.preventDefault();
                
                const dragging = document.querySelector('.dragging')
                const applyAfter = getNewPosisiton(column, e.clientY)

                if (!applyAfter) {
                    column.appendChild(dragging);
                } else {
                    column.insertBefore(dragging, applyAfter);
                } 
            })
        })
        
    }catch(err){
        console.error('Error at drag', err)
    }
    
}

function getNewPosisiton(column, posY){
    const cards = column.querySelectorAll('.task:not(.dragging)')
    let result;

    for(let referCard of cards){
        const box = referCard.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if(posY >= boxCenterY){
            result = referCard;
            break;
        } 
    }
    
    return result;

}

export function addHour(hour){
    
    let thisHour = hour;

    if(thisHour < 23){
        thisHour++;
        document.querySelector('#hour').textContent = String(thisHour).padStart(2, '0');
    }else 
    if(thisHour == 23){
        thisHour = 0;
        document.querySelector('#hour').textContent = String(thisHour).padStart(2, '0');
    }
    
    return thisHour;
    
}

export function subHour(hour){
    
    let thisHour = hour;

    if(thisHour > 0){
        thisHour--;
        document.querySelector('#hour').textContent = String(thisHour).padStart(2, '0');
    }else
    if(thisHour == 0){
        thisHour = 23;
        document.querySelector('#hour').textContent = String(thisHour).padStart(2, '0');
    }
    
    return thisHour;
}

export function addMinutes(minutes){

    let thisMinutes = minutes;

    if(thisMinutes < 55){
        thisMinutes+=5;
        document.querySelector('#minutes').textContent = String(thisMinutes).padStart(2, '0');
    }else
    if(thisMinutes == 55){
        thisMinutes = 0;
        document.querySelector('#minutes').textContent = String(thisMinutes).padStart(2, '0');
    }

    return thisMinutes;
}

export function subMinutes(minutes){

    let thisMinutes = minutes;

        if(thisMinutes > 0){
            thisMinutes-=5;
            document.querySelector('#minutes').textContent = String(thisMinutes).padStart(2, '0');
        }else
        if(thisMinutes == 0){
            thisMinutes = 55;
            document.querySelector('#minutes').textContent = String(thisMinutes).padStart(2, '0');
        }

    return thisMinutes;
}


