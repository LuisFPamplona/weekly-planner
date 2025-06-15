import { createTask } from "./ui.js";
import { sendTask } from "./storage.js";

export async function addTask(day, hour, minutes){

    const taskText = document.querySelector('#new-task-text').value;

    if(taskText.trim() != ''){

        const taskHour = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
        
        let task = {
            text: taskText,
            hour: taskHour,
            weekDay: day
        }      
        try{

            const savedTask = await sendTask(task)
            
            let newTask = createTask(savedTask.text, savedTask.hour, savedTask.id);
            
            let divPai = document.querySelector(`#${day}`);
            
            divPai.appendChild(newTask);
            
            document.querySelector('#new-task-text').value = ''
            
            hour = 0;
            minutes = 0;
            document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
            document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');

        }catch(err){
            console.error('error at add task', err)
        }

    }else{
        document.querySelector('#new-task-text').value = ''
    }
}

