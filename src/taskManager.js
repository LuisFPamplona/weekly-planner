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

export async function addTaskAllDays(hour, minutes){
    try{

        const taskText = document.querySelector('#new-task-text').value;


        if(taskText.trim() != ''){

            const taskHour = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');

            const weekDays = [
                'monday-container',
                'tuesday-container',
                'wednesday-container',
                'thursday-container',
                'friday-container',
                'saturnday-container',
                'sunday-container'
            ]
        
            for(let daysAmount = 0; daysAmount < 7; daysAmount++){

                let task = {
                    text: taskText,
                    hour: taskHour,
                    weekDay: weekDays[daysAmount]
                }
                
                const savedTask = await sendTask(task)
                
                let newTask = createTask(savedTask.text, savedTask.hour, savedTask.id);
                
                let divPai = document.querySelector(`#${weekDays[daysAmount]}`);
                
                divPai.appendChild(newTask);
                
            }
                document.querySelector('#new-task-text').value = ''
                
                hour = 0;
                minutes = 0;
                document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
                document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');


            
        }else{
        document.querySelector('#new-task-text').value = ''
        }   
            

    }catch(err){
        console.error('Error at add task to all days', err)
    }


}