import { addTask } from "./taskManager.js";
import { loadTasks } from "./storage.js"

loadTasks()


let hour = 0;
let minutes = 0;


const mondayAdd = document.querySelector('#monday-add')
mondayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('monday-container' , hour , minutes)
})

const tuesdayAdd = document.querySelector('#tuesday-add')
tuesdayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('tuesday-container' , hour , minutes)
})

const wednesdayAdd = document.querySelector('#wednesday-add')
wednesdayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('wednesday-container' , hour , minutes)
})

const thursdayAdd = document.querySelector('#thursday-add')
thursdayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('thursday-container' , hour , minutes)
})

const fridayAdd = document.querySelector('#friday-add')
fridayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('friday-container' , hour , minutes)
})

const saturndayAdd = document.querySelector('#saturnday-add')
saturndayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('saturnday-container' , hour , minutes)
})

const sundayAdd = document.querySelector('#sunday-add')
sundayAdd.addEventListener('click', (e)=>{
    e.preventDefault()
    addTask('sunday-container' , hour , minutes)
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