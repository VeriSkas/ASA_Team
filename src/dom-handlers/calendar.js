import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { setClickedPage } from "../shared/ls-service";
import { createEvents, getEvents } from '../api/api-handlers';

export const calendarLink = () => {
    const calendarLink = document.querySelector('#nav-links_calendar');
    const calendar = document.querySelector('.calendar__wrapper');
    const title = document.querySelector('.content__todo_title');
    const inputTodos = document.querySelector('.content__todo_form');
    const todoList = document.querySelector('.content__todo_todosMain');
    const dateStart = document.querySelector('#dateStart');
    const dateEnd = document.querySelector('#dateEnd');

    calendarLink.addEventListener('click', event => {
        event.preventDefault();
        calendar.style.display = 'grid';
        title.innerText = 'Calendar';
        inputTodos.style.display = 'none';
        todoList.style.display = 'none';

        setClickedPage('calendar');
        renderCalendar();
    })

    eventHandler();
    dateStart.value = moment().format().slice(0, 10);
    dateEnd.value = dateStart.value;
}

export const renderCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    let calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        initialDate: '2021-08-14',
        navLinks: true,
        editable: true,
        dayMaxEvents: true,
        dateClick: function(info) {
            // console.log(info);
            console.log(info);
            console.log('Clicked on: ' + info.dateStr);
            console.log('innerText: ' + info.dayEl.innerText);
            console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            console.log('Current view: ' + info.view.type);
            // change the day's background color just for fun
            // info.dayEl.style.backgroundColor = 'red';
          },
        events: [
        ]
    });
    getEvents()
        .then(events => {
            if(events) {
                events.forEach(event => {
                    calendar.addEvent(event);
                });
            }
        })
    calendar.render();
}

export const eventHandler = () => {
    const formEvent = document.querySelector('#inputEvent-form');
    const inputEvent = document.querySelector('.calendar__wrapper-inputEvent-form_event-input');
    const dateEnd = document.querySelector('#dateEnd');
    const dateStart = document.querySelector('#dateStart');

    const eventValue = {
        title: null,
        start: null,
        end: null,
        uuid: null,
    }

    console.log(eventValue);
    formEvent.addEventListener('submit', event => {
        event.preventDefault();
        eventValue.title = inputEvent.value;
        eventValue.start = dateStart.value;
        eventValue.end = dateEnd.value;
        console.log(eventValue);
        createEvents(eventValue)
            .then(() => renderCalendar())
    })
}
