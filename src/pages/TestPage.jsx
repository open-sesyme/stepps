import React, {useEffect, useState} from 'react';

const TestPage = () => {
    const times = [12,1,2,3,4,5,6,7,8,9,10,11];
    const minutes = 700;

    const events =[
        {
            eventId: 1,
            eventName: 'Testing event',
            eventVenue: 'Lecture Hall 101',
            eventStart: 8,
            eventEnd: 9,
            eventColor: 'red',
        },
        {
            eventId: 2,
            eventName: 'Another event on Calendar',
            eventVenue: 'Lecture Hall 101',
            eventStart: 12,
            eventEnd: 13.5,
            eventColor: 'blue',
        },
        {
            eventId: 3,
            eventName: 'Overlapping Event Testing',
            eventVenue: 'Shefferton Rm 14',
            eventStart: 13,
            eventEnd: 14,
            eventColor: '',
            eventMargin: 80,
        }
    ]

    const [isEvents, setIsEvents] = useState(null);
    
    useEffect(() => {
        setIsEvents(events)
    }, []);

    return (
        <div id='calendar_page'>
            <div className='header-part'>
                <button type='button' className='back-btn'><i className='bi bi-chevron-left'></i></button>
                <h4>Calender</h4>
                <button type='button' className='more-btn'><i className='bi bi-three-dots'></i></button>
            </div>
            <div className="current-date">
                <div className="today">
                    <h2>Today</h2>
                    <div className='pagination'>
                        <button type='button' className='prev-btn'><i className='bi bi-chevron-left'></i></button>
                        <button type='button' className='next-btn'><i className='bi bi-chevron-right'></i></button>
                    </div>
                </div>
                <div className="date-events">
                    <p>Thursday, 20 Jun</p>
                    <span>5 Events</span>
                </div>
            </div>
            <div className="calender-container">
                <div className="calendar">
                    <div className='minutes-line' style={{top:`${minutes}px`}}></div>
                    { isEvents &&
                        events.map((event) => (
                            <div className='event shadow' key={event.eventId} style={{backgroundColor: event.eventColor !== '' ? event.eventColor : '', height: `${((event.eventEnd * 60) - (event.eventStart * 60)) + 1}px`, top: `${event.eventStart * 60}px`, left: event?.eventMargin, width: event?.eventMargin !== null ? `calc(100% - ${event?.eventMargin}px)` : ''}}>
                                <h4>{event.eventName}</h4>
                                <span className='venue'>{event.eventVenue}</span>
                                <span className='event-time'><i className='bi bi-clock'></i>{event.eventStart}am - {event.eventEnd}am</span>
                            </div>
                        ))
                    }
                    {
                        times.map((time,index) => (
                            <div className="time-container" key={index}>
                                <h4>{time}am</h4>
                                <div className='h-line'></div>
                            </div>
                        ))
                    }
                    {
                        times.map((time,index) => (
                            <div className="time-container" key={index}>
                                <h4>{time}pm</h4>
                                <div className='h-line'></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TestPage