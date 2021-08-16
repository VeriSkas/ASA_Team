import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { getUID, setClickedPage } from "../shared/ls-service";
import { createEvents, deleteEvent, getEvents, updateEvent } from '../api/api-handlers';

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
    const dateStart = document.querySelector('#dateStart');
    const dateEnd = document.querySelector('#dateEnd');

    dateStart.setAttribute('clicked', true);

    dateStart.onclick = () => {
        dateStart.setAttribute('clicked', true);
        dateEnd.removeAttribute('clicked');
    }

    dateEnd.onclick = () => {
        dateStart.removeAttribute('clicked');
        dateEnd.setAttribute('clicked', true);
    }

    let calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,dayGridDay'
        },
        navLinks: true,
        editable: true,
        dayMaxEvents: true,
        events: [
        ],

        dateClick: function(info) {
            if (dateEnd.getAttribute('clicked')) {
                dateEnd.value = info.dateStr;
            } else {
                dateStart.value = info.dateStr;
            }
        },

        eventClick: event => {
            const id = event.event.id;
            const deleteQestion = confirm(`Delete event: '${event.event._def.title}' ?`);
            if (deleteQestion) {
                deleteEvent(id)
                    .then(() => renderCalendar());
            }
        },

        eventDrop: event => {
            const eventValue = {
                title: event.event.title,
                start: event.event.startStr,
                end: event.event.endStr,
                id: event.event.id,
                uuid: null,
            };
            const updateQestion = confirm(`Update event: '${eventValue.title}' ?`);
            if (updateQestion) {
                updateEvent(eventValue);
            }
        },

        eventResize: event => {
            const eventValue = {
                title: event.event.title,
                start: event.event.startStr,
                end: event.event.endStr,
                id: event.event.id,
                uuid: null,
            };
            const updateQestion = confirm(`Update event: '${eventValue.title}' ?`);
            if (updateQestion) {
                updateEvent(eventValue);
            }
        },
    });

    getEvents()
        .then(events => {
            if(events) {
                events.forEach(event => {
                    if(event.uuid === getUID()) {
                        console.log(event);
                        calendar.addEvent(event);
                    }
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

    formEvent.addEventListener('submit', event => {
        event.preventDefault();
        eventValue.title = inputEvent.value;
        eventValue.start = dateStart.value;
        eventValue.end = dateEnd.value;
        eventValue.uuid = getUID();
        createEvents(eventValue)
            .then(() => renderCalendar());
        inputEvent.value = '';
    })
}
