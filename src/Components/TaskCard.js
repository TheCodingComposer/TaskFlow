import { useState, useEffect, useRef, useCallback } from "react";
import AlarmSound from "../AlarmSound.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { faCirclePause } from '@fortawesome/free-regular-svg-icons';
import Arrow from "./Arrow.js";


export default function TaskCard({task, removeTask, handleMoveTask}) {

    const [startingPosition, setStartingPosition] = useState({})

    //set x / y properties of element 
    const positionRef = useCallback((node) => {
        console.log(node)
        if (node !== null) {
            setStartingPosition({
                x: node.getBoundingClientRect().x,
                y: node.getBoundingClientRect().y
            })
        }
    }, [])

    const initialState = useRef({
        hours: task.hours, 
        minutes: task.minutes, 
        seconds: task.seconds, 
        backgroundColor: task.backgroundColor,
        sound: task.sound
    })

   
  
    const firstRender = useRef(true)

    

    const [timeRemaining, setTimeRemaining] = useState({
        hours: task.hours, 
        minutes: task.minutes, 
        seconds: task.seconds})
    //id to turn off counter with clearInterval
    const [intervalId, setIntervalId] = useState(null)
    const [startTimer, setStartTimer] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    const [position, setPosition] = useState({
        x: 0,
        y: 0}
        )
        //position of mouse within element when initially clicked
    const [currentOffset, setCurrentOffset] = useState({xOffset: 0, yOffset: 0})

    //set to true on mouse up so that element "floats" back into position
    const [released, setReleased] = useState(false)

   const [alarm, setAlarm] = useState({ringing: false, id: 0})


    useEffect(() => {
        //keep from running on first render
        if (!firstRender.current) {
            
        }
            firstRender.current = false

        if (startTimer) {

            
            //declare initial values
            let {hours, minutes, seconds} = timeRemaining
        
            const id = setInterval(() => {
                
                //Is there a better way than nesting?


                    if (seconds > 0) {
                        setTimeRemaining(prevValue => { return ({...prevValue, seconds: prevValue.seconds - 1}) })
                        seconds--;
                    } else {
                        if (minutes > 0) {
                            setTimeRemaining(prevValue => { return ({...prevValue, minutes: prevValue.minutes - 1, seconds: 59}) })
                            minutes--;
                            seconds = 59;
                        } else {
                            if (hours > 0) {
                                setTimeRemaining(prevValue => { return ({hours: prevValue.hours - 1, minutes: 59, seconds: 59}) })
                                hours--;
                                minutes = 59;
                                seconds = 59;
                            } else {
                                let alarmId = AlarmSound(true, task.sound)
                                setAlarm({...alarm, ringing: true, id: alarmId})
                                setTimeRemaining(prevValue => { return ({hours: 0, minutes: 0, seconds: 0})})
                                setStartTimer(false)
                                
                            
                        }
                     
                    }
                   
                    
                    
                

            }  
                
               
        }, 1000)
            setIntervalId(id)
            
        } else {
            clearInterval(intervalId)
        }
        
     
    }, [startTimer])

   


    let timerStarted = false;


   


    return (
        <div  className="card-wrapper task-card-wrapper" 
            style={{backgroundColor: initialState.current.backgroundColor, 
            position: 'relative',
            left: position.x,
            top: position.y,
            transition: released ? '.3s' : '0s',
            zIndex: mouseDown ? '1' : '0'
            }}
            ref={positionRef}

            onClick={() => {
                console.log(alarm)
                if (alarm.ringing) {
                    AlarmSound(false, null, alarm.id)
                    setAlarm({ringing: false, id: 0})
                    
                    
                }
            }}
            
            onMouseDown={(e) => {
                setReleased(false)
                setCurrentOffset({xOffset: e.clientX,
                    yOffset: e.clientY})
                 setMouseDown(true) 
            }}

            onMouseUp={() => {
                
               setMouseDown(false)
               setReleased(true)
               setPosition({x: 0, y: 0})
            }}

            //if mouse goes out of element, trigger mouseup 
            onMouseOut={(e) => {
                setMouseDown(false)
                setReleased(true)
                setPosition({x: 0, y: 0})
            }}

            onPointerMove={(e) => {
            
                if (mouseDown) {
                    
                    setPosition({
                        x: (e.clientX - currentOffset.xOffset), 
                        y: (e.clientY - currentOffset.yOffset)
                        })
                }
            }}

            
            >
            <h1>{task.taskName ? task.taskName : "Untitled"}</h1>
            <div className="task-time-wrapper time-wrapper" >
                <div className="time-box">
                    {/* show extra 0 if null */}
                    {!timeRemaining.hours && 0}
                    {/* show 0 in front of number if only one digit */}
                    {timeRemaining.hours > 9 ? timeRemaining.hours : "0" + timeRemaining.hours}
                    
                </div>
                <div className="time-box">
                    {!Number(timeRemaining.minutes) && 0}
                    {timeRemaining.minutes > 9 ? timeRemaining.minutes : "0" + timeRemaining.minutes}
                </div>
                <div className="time-box">
                    {!timeRemaining.seconds && 0}
                    {timeRemaining.seconds > 9 ? timeRemaining.seconds : "0" + timeRemaining.seconds}
                </div>
            </div>
            <div className="task-btn-wrapper">

                <button onClick={() => setStartTimer(!startTimer)}>
                {startTimer ? <FontAwesomeIcon className='pause-icon' icon={faCirclePause} />
                    : <FontAwesomeIcon className='play-icon' icon={faCirclePlay} />}
                </button>

                <button onClick={() => {

                setStartTimer(false)
                //may need to do initialState.current.hours, etc. since BG color is in object
                setTimeRemaining(initialState.current)
                
                }}>Restart</button>

           </div>

            {/* Better to consolidate into single component? */}
            <Arrow
                back={true}
                onArrowClick={handleMoveTask}
                id={task.id}
            />
            <Arrow
                back={false}
                onArrowClick={handleMoveTask}
                id={task.id}
            />




           {/* Turn into x button in to left */}
           <button onClick={() => {
            removeTask(task.id)
           }}>CLICK ME</button>

        </div>
    )
}


// <a href="https://www.flaticon.com/free-icons/video" title="video icons">Video icons created by Bingge Liu - Flaticon</a>