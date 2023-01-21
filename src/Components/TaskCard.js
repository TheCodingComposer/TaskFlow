import { useState, useEffect, useRef } from "react";
import randomColor from '../randomColor.js'
import playIcon from '../icons/play.png'

export default function TaskCard({task, removeTask}) {

    //change using useRef?
    const initialState = useRef({hours: task.hours, minutes: task.minutes, seconds: task.seconds})



    const backgroundColor = useRef(randomColor())
    

    const firstRender = useRef(true)

    const [timeRemaining, setTimeRemaining] = useState({hours: task.hours, minutes: task.minutes, seconds: task.seconds})
    const [intervalId, setIntervalId] = useState(null)
    const [startTimer, setStartTimer] = useState(false)




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
                                alert('TIME')
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
        <div  className="card-wrapper task-card-wrapper" style={{backgroundColor: backgroundColor.current}}>
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
                <button onClick={() => setStartTimer(!startTimer)}>{startTimer ? <img src={playIcon}  /> : 'Play'}</button>

                <button onClick={() => {

                setStartTimer(false)
                setTimeRemaining(initialState.current)
                
                }}>Restart</button>
           </div>
           <button onClick={() => {
            removeTask(task.id)
           }}>CLICK ME</button>

        </div>
    )
}


// <a href="https://www.flaticon.com/free-icons/video" title="video icons">Video icons created by Bingge Liu - Flaticon</a>