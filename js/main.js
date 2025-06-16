import { addTask, addTaskAllDays } from "./taskManager.js";
import { loadTasks } from "./storage.js"
import { dragTasks } from "./ui.js";
import { removeAllTasks } from "./storage.js";
import { addHour, subHour, addMinutes, subMinutes } from "./ui.js";

let hour = 0;
let minutes = 0;

const hourAdd = document.querySelector('#add-hour')
hourAdd.addEventListener('click', (e)=>{
    hour = addHour(hour)
})

const hourSub = document.querySelector('#sub-hour');
hourSub.addEventListener('click', (e)=>{
    hour = subHour(hour)
})

const minutesAdd = document.querySelector('#add-minutes');
minutesAdd.addEventListener('click', (e)=>{
    minutes = addMinutes(minutes)
})

const minutesSub = document.querySelector('#sub-minutes');
minutesSub.addEventListener('click', (e)=>{
    minutes = subMinutes(minutes)
})

loadTasks()
dragTasks()


const addAllDays = document.querySelector('#add-all-days')
addAllDays.addEventListener('click', (e)=>{  
    e.preventDefault();
    addTaskAllDays(hour, minutes)
    console.log(hour, minutes)
})

const removeAllDays = document.querySelector('#remove-all-days')
removeAllDays.addEventListener('click', (e)=>{
    removeAllTasks()
})


const mondayAdd = document.querySelector(`#monday-add`)
addBtn(mondayAdd, 'monday')

const tuesdayAdd = document.querySelector(`#tuesday-add`)
addBtn(tuesdayAdd, 'tuesday')

const wednesdayAdd = document.querySelector(`#wednesday-add`)
addBtn(wednesdayAdd, 'wednesday')

const thursdayAdd = document.querySelector(`#thursday-add`)
addBtn(thursdayAdd, 'thursday')

const fridayAdd = document.querySelector(`#friday-add`)
addBtn(fridayAdd, 'friday')

const saturndayAdd = document.querySelector(`#saturnday-add`)
addBtn(saturndayAdd, 'saturnday')

const sundayAdd = document.querySelector(`#sunday-add`)
addBtn(sundayAdd, 'sunday')



function addBtn(btn, day){
    
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        addTask(`${day}-container`, hour, minutes)
    })
}