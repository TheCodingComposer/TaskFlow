import {useState, useId} from 'react'
import randomColor from '../randomColor';
import Dropdown from './Dropdown';

export default function NewTaskForm({createNewTask, deleteTasks}) {

    
    //TODO consolidate hours/minutes/seconds into their own time object within larger object?
    const [newTask, setNewTask] = useState({taskName: '', hours: '', minutes: '', seconds: '', backgroundColor: ''});

    //one of five color palettes to use for card BG color
    const [palette, setPalette] = useState('Random');
    //one of three sounds to use for alarm quality
    const [sound, setSound] = useState('default')

   

    function handleNewTaskNameChange(e) {
        setNewTask({...newTask, taskName: e.target.value})
    }

    function handleHourChange(e) {
        
        //Check that input is an integer
        if (Number(e.target.value) % 1 !== 0) {
           return;
        }

        if (e.target.value.length === 0) {
            setNewTask({...newTask, hours: ''})
            
        } else {
            setNewTask({...newTask, hours: Number(e.target.value)})
        }
        
    }

    function handleMinuteChange(e) {
        
        if (Number(e.target.value) % 1 !== 0) {
            return;
         }
         if (e.target.value.length === 0) {
            setNewTask({...newTask, minutes: ''})
            
        } else {
            setNewTask({...newTask, minutes: Number(e.target.value)})
        }
    }

    function handleSecondChange(e) {
        
        if (Number(e.target.value) % 1 !== 0) {
            return;
         }
        
         if (e.target.value.length === 0) {
            setNewTask({...newTask, seconds: ''})
            
        } else {
            setNewTask({...newTask, seconds: Number(e.target.value)})
        }
    }

    function handleDropdownChange(name, type) {
        (type === 'color') ? setPalette(name) : setSound(name)    
    }



    return (
        <>
        <div className="card-wrapper">
        

        <div className="task-input-wrapper">

            <div>New Task:</div>
            <input value={newTask.taskName} className="task-input" maxLength="30" onChange={handleNewTaskNameChange}></input>

        </div>

            <div className="time-wrapper">
                
                <input value={newTask.hours} className="hour-input time-input" maxLength="2" placeholder="00" onChange={handleHourChange}></input>
             
                <input value={newTask.minutes} className="hour-input time-input" maxLength="2" placeholder="00" onChange={handleMinuteChange}></input>
                
                <input value={newTask.seconds} className="hour-input time-input" maxLength="2" placeholder="00" onChange={handleSecondChange}></input>
            
            </div>
            <h3>Color:</h3>
            <Dropdown 
                name={palette}
                options={['Random', 'Warm', 'Cool', 'Pastel', 'Neon']}
                onDropdownChange={handleDropdownChange}
                type={'color'}
            />
            <h3>Sound:</h3>
            <Dropdown 
                name={sound}
                options={['gentle', 'default', 'harsh']}
                onDropdownChange={handleDropdownChange}
                type={'sound'}
            />

            <button className="new-task-btn" onClick={() => { 
                //choose random background color (future: let user choose with input)
                const bgColor = randomColor(palette)
                
                console.log(newTask)
                createNewTask({...newTask, backgroundColor: bgColor, sound: sound})
                setNewTask({taskName: '', hours: '', minutes: '', seconds: '', backgroundColor: '', sound: 'default'})
                
                }
                }>Create New Task</button>

            <button onClick={() => {
                deleteTasks();
            }}>Delete Tasks</button>

        </div>
    </>
    )
}