import { useState, useEffect } from 'react';
import './App.css';
import NewTaskForm from './Components/NewTaskForm';
import TaskCard from './Components/TaskCard';


//give tasks keys

//filter task by key when x is clicked



function App() {
 
  const [tasks, setTasks] = useState(() => {
    // getting stored value 
    // (need to add an if (localStorage.getitem("tasks") to make sure it exists?)
    // When I first used the app, the first task I added disappeared
   
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });



  function handleCreateNewTask(newTask) {
    
    //generate random id for each task
    const id = Math.floor(Math.random() * 1000000)

    if (!newTask.hours) {
      newTask.hours = 0
    }
    if (!newTask.minutes) {
      newTask.minutes = 0
    }
    if (!newTask.seconds) {
      newTask.seconds = 0
    }

    setTasks([...tasks, {...newTask, id: id}])
 
  }


  function removeTask(id) {
     const filteredTasks = tasks.filter(task => task.id !== id)
     setTasks(filteredTasks)
  }

  // if 'back' is true, move back in array, otherwise move foward
  function handleMoveTask(id, back) {

    //do nothing if there is no task or only one task
    if (tasks.length < 2) {
      return;
    }

  
      
      
      const index = tasks.findIndex((task) => task.id === id)

      if (index == 0 && back) {
        return
      }

      if (index == tasks.length - 1 && !back) {
        return
      }

      const task = tasks[index]

      //NOTE: had to copy with spread operator and not directly reference "tasks", 
      //because in the latter case tasksCopy referenced the same object as setTasks, 
      //so calling setTasks didn't trigger a re-render
      const tasksCopy = [...tasks];
      tasksCopy.splice(index, 1)
      tasksCopy.splice(back ? index - 1 : index + 1, 0, task)

      setTasks(tasksCopy)
      
  }

  //delete all tasks
  function handleDeleteTasks() {
    setTasks([])
  }
   

  useEffect(() => {
    // storing input name
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div className="App">
      <NewTaskForm
        createNewTask={handleCreateNewTask}
        deleteTasks={handleDeleteTasks}
      />
      {tasks && tasks.map((task) => {
      return (

      <TaskCard 
        task={task}
        key={task.id}
        removeTask={removeTask}
        handleMoveTask={handleMoveTask}
      />

      )
      })}
    </div>
  );
}

export default App;
