import { createTask } from "./ui.js";
import { sendTask } from "./storage.js";
import { URL } from "./storage.js";

export async function addTask(day, hour, minutes){

    const taskText = document.querySelector('#new-task-text').value;

    let dataHour;

    if(hour == 0){
        dataHour = 24;
    }else{
        dataHour = hour
    }
    const dataMinutes = minutes;

    if(taskText.trim() != ''){

        const taskHour = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
        
        let task = {
            text: taskText,
            hour: taskHour,
            weekDay: day,
            dataHour: dataHour,
            dataMinutes: dataMinutes,
        }      


        try{
            
            const savedTask = await sendTask(task)
            console.log(savedTask)
            
            let newTask = createTask(savedTask.text, savedTask.hour, savedTask.id, savedTask.dataHour, savedTask.dataMinutes);
            
            let divPai = document.querySelector(`#${day}`);


            
            divPai.appendChild(newTask);
            taskOrder(divPai)

            
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
        
        const dataMinutes = minutes;

        let dataHour;

        if(hour == 0){
            dataHour = 24;
        }else{
            dataHour = hour
        }
        
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
                    weekDay: weekDays[daysAmount],
                    dataHour: dataHour,
                    dataMinutes: dataMinutes,
                }
                
                const savedTask = await sendTask(task)
                
                let newTask = createTask(savedTask.text, savedTask.hour, savedTask.id, savedTask.dataHour, savedTask.dataMinutes);
                console.log(newTask)
                
                let divPai = document.querySelector(`#${weekDays[daysAmount]}`);

                divPai.appendChild(newTask);
                taskOrder(divPai)
                
                
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

export function taskOrder(divPai){
    const tasks = Array.from(divPai.querySelectorAll('.task')) //criando um array onde cada .task na div pai fica em um index

    tasks.sort((a,b)=>{
        const aTime = parseInt(a.dataset.hour) * 60 + parseInt(a.dataset.minutes)
        const bTime = parseInt(b.dataset.hour) * 60 + parseInt(b.dataset.minutes)

        return aTime - bTime;
    })

    tasks.forEach(task=> divPai.appendChild(task))
}