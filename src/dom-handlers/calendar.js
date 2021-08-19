import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { getUID, setClickedPage } from "../shared/ls-service";
import { createEvents, deleteEvent, getEvents, updateEvent } from '../api/api-handlers';
import { checkLengthEvent } from '../shared/validators';
import { errorText } from '../shared/constants/errorText';

export const calendarLink = () => {
    const calendarLink = document.querySelector('#nav-links_calendar');
    const calendar = document.querySelector('.calendar__wrapper');
    const title = document.querySelector('.content__todo_title');
    const inputTodos = document.querySelector('.content__todo_form');
    const todoList = document.querySelector('.content__todo_todosMain');
    const dateStart = document.querySelector('#dateStart');
    const dateEnd = document.querySelector('#dateEnd');
    const taskMenu = document.querySelector('.content__todoMenu');

    calendarLink.addEventListener('click', event => {
        event.preventDefault();
        taskMenu.classList.add('close');
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
                        event.end = moment(event.end).add(1, 'day').format('YYYY-MM-DD');
                        calendar.addEvent(event);
                    }
                });
            }
        })
    calendar.render();
}

export const eventHandler = () => {
    const formEvent = document.querySelector('#inputEvent-form');
    const eventBtn = document.querySelector('.calendar__wrapper-inputEvent-form_btn-button');
    const inputEvent = document.querySelector('.calendar__wrapper-inputEvent-form_event-input');
    const eventError = document.querySelector('#inputEventErrorText');
    const eventEndDateError = document.querySelector('#inputEventEndDateErrorText');
    const eventStartDateError = document.querySelector('#inputEventStartDateErrorText');
    const dateEnd = document.querySelector('#dateEnd');
    const dateStart = document.querySelector('#dateStart');
    const todayDate = moment().format().slice(0, 10);

    const eventValue = {
        title: null,
        start: null,
        end: null,
        uuid: null,
    }

    const eventFormFields = {
        startDate: {
            isValid: false
        },
        endDate: {
            isValid: false
        },
        event: {
            isValid: false
        },
    }

    eventBtn.setAttribute('disabled', true);

    const checkFormValid = () => {
        const isFormValid = Object.values(eventFormFields).every(value => value.isValid );
        isFormValid ? eventBtn.removeAttribute('disabled') : eventBtn.setAttribute('disabled', true);
    };

    inputEvent.oninput = () => {
        if (checkLengthEvent(inputEvent.value)) {
            eventFormFields.event.isValid = true;
            eventError.innerText = '';
        } else {
            eventFormFields.event.isValid = false;
            eventError.innerText = errorText.eventError;
        }

        checkFormValid();
    }

    dateStart.oninput = () => {
        if (dateStart.value > dateEnd.value) {
            eventFormFields.endDate.isValid = false;
            eventEndDateError.innerText = errorText.eventEndDateError;
        } else {
            eventFormFields.endDate.isValid = true;
            eventEndDateError.innerText = '';
        }

        if (dateStart.value < todayDate) {
            eventFormFields.startDate.isValid = false;
            eventStartDateError.innerText = errorText.eventStartDateError;
        } else {
            eventFormFields.startDate.isValid = true;
            eventStartDateError.innerText = '';
        }

        checkFormValid();
    }

    dateStart.onblur = () => {
        if (dateStart.value > dateEnd.value) {
            eventFormFields.endDate.isValid = false;
            eventEndDateError.innerText = errorText.eventEndDateError;
        } else {
            eventFormFields.endDate.isValid = true;
            eventEndDateError.innerText = '';
        }

        if (dateStart.value < todayDate) {
            eventFormFields.startDate.isValid = false;
            eventStartDateError.innerText = errorText.eventStartDateError;
        } else {
            eventFormFields.startDate.isValid = true;
            eventStartDateError.innerText = '';
        }

        checkFormValid();
    }

    dateEnd.oninput = () => {
        if (dateStart.value > dateEnd.value) {
            eventFormFields.endDate.isValid = false;
            eventEndDateError.innerText = errorText.eventEndDateError;
        } else {
            eventFormFields.endDate.isValid = true;
            eventEndDateError.innerText = '';
        }

        checkFormValid();
    }

    dateEnd.onblur = () => {
        if (dateStart.value > dateEnd.value) {
            eventFormFields.endDate.isValid = false;
            eventEndDateError.innerText = errorText.eventEndDateError;
        } else {
            eventFormFields.endDate.isValid = true;
            eventEndDateError.innerText = '';
        }

        checkFormValid();
    }

    formEvent.addEventListener('submit', event => {
        event.preventDefault();
        if (checkLengthEvent(inputEvent.value) &&
            (dateStart.value < dateEnd.value) &&
            (dateStart.value > todayDate)
            ) {
            eventValue.title = inputEvent.value;
            eventValue.start = dateStart.value;
            eventValue.end = dateEnd.value;
            eventValue.uuid = getUID();

            createEvents(eventValue)
                .then(() => renderCalendar());

            inputEvent.value = '';
        }
    })
}
