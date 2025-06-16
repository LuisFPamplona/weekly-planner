import { createTask } from "./ui.js";
import { taskOrder } from "./taskManager.js";

export const URL = 'http://localhost:3001/tasks'

export async function sendTask(task){
    try{
        
        const taskToSend =  await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-type' : 'application/json'
            },
        });
        
        return await taskToSend.json();
    }catch(err){
        console.log('Error at get data', err)
    }
}

export async function loadTasks(){
    try{

        let response = await fetch(URL)
        
        let tasks = await response.json()
        
        console.log(tasks)
        
        tasks.forEach(task => {
            let newTask  = createTask(task.text, task.hour, task.id, task.dataHour, task.dataMinutes, task.timeInMinutes);
            let divPai = document.querySelector(`#${task.weekDay}`);
            
            divPai.appendChild(newTask)
            taskOrder(divPai)
        });
    }catch(err){
        console.error('Error at load data', err);
    }
}

export async function deleteTask(id) {
    try{

        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })

        

    }catch(err){
        console.error('Error at delete data', err);
    }
}

export async function editTask(id, newTaskText){
    try{
        const response = await fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({text: newTaskText})
        })
        


    }catch(err){
        console.error('Error at editTask', err);
    }
}

export async function removeAllTasks(){
    try{

        const response = await fetch(URL)
        const tasks = await response.json();
        
        tasks.forEach(async (task)=>{
            await fetch(`${URL}/${task.id}`, {
                method: 'DELETE'
            })
        })
        
        document.querySelectorAll('.task').forEach(task => task.remove());
        

    }catch(err){
        console.error('Error at delete data', err);
    }
}