const taskList = [];
let hour = 0;
let minutes = 0;

const mondayAdd = document.querySelector('#monday-add')
mondayAdd.addEventListener('click', (e)=>{
    addTask('#monday-container' , hour , minutes)
})

const tuesdayAdd = document.querySelector('#tuesday-add')
tuesdayAdd.addEventListener('click', (e)=>{
    addTask('#tuesday-container' , hour , minutes)
})

const wednesdayAdd = document.querySelector('#wednesday-add')
wednesdayAdd.addEventListener('click', (e)=>{
    addTask('#wednesday-container' , hour , minutes)
})

const thursdayAdd = document.querySelector('#thursday-add')
thursdayAdd.addEventListener('click', (e)=>{
    addTask('#thursday-container' , hour , minutes)
})

const fridayAdd = document.querySelector('#friday-add')
fridayAdd.addEventListener('click', (e)=>{
    addTask('#friday-container' , hour , minutes)
})

const saturndayAdd = document.querySelector('#saturnday-add')
saturndayAdd.addEventListener('click', (e)=>{
    addTask('#saturnday-container' , hour , minutes)
})

const sundayAdd = document.querySelector('#sunday-add')
sundayAdd.addEventListener('click', (e)=>{
    addTask('#sunday-container' , hour , minutes)
})

document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');


const hourAdd = document.querySelector('#add-hour');
hourAdd.addEventListener('click', (e)=>{
    if(hour < 23){
        hour++;
        document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
    }
});

const minutesAdd = document.querySelector('#add-minutes');
minutesAdd.addEventListener('click', (e)=>{
    if(minutes < 50){
        minutes+=10;
        document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
    }
});

const hourSub = document.querySelector('#sub-hour');
hourSub.addEventListener('click', (e)=>{
    if(hour > 0){
        hour--;
        document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
    }
});

const minutesSub = document.querySelector('#sub-minutes');
minutesSub.addEventListener('click', (e)=>{
    if(minutes > 0){
        minutes-=10;
        document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
    }
});

function addTask(day, hour, minutes){

    const taskText = document.querySelector('#new-task-text').value;

    if(taskText.trim() != ''){

        const taskHour = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
        const taskId = Date.now()
        
        const task = {
            text: taskText,
            hour: taskHour,
            id: taskId,
            weekDay: day
        }
        
        taskList.push(task)
        
        
        let newTask = createTask(taskText, taskHour, taskId);
        
        let divPai = document.querySelector(day)
        
        divPai.appendChild(newTask);
        
        console.log(taskList)
        
        document.querySelector('#new-task-text').value = ''
        
        hour = 0;
        minutes = 0;
        document.querySelector('#hour').textContent = String(hour).padStart(2, '0');
        document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
    }else{
        document.querySelector('#new-task-text').value = ''
    }
}
    
function createTask(text, hour, id){
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