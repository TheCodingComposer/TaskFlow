import { useState, useEffect } from 'react';
import './App.css';
import NewTaskForm from './Components/NewTaskForm';
import TaskCard from './Components/TaskCard';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import "@aws-amplify/ui-react/styles.css"
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card
} from "@aws-amplify/ui-react"

Amplify.configure(config)


//give tasks keys

//filter task by key when x is clicked



function App({ signOut }) {


 
  const [tasks, setTasks] = useState(() => {
    // getting stored value 
    // (need to add an if (localStorage.getitem("tasks") to make sure it exists?)
    // When I first used the app, the first task I added disappeared
   
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });



  // const [taskPositions, setTaskPositions] = useState([])

  const [taskPositions, setTaskPositions] = useState(() => {
    // getting stored value 
    // (need to add an if (localStorage.getitem("tasks") to make sure it exists?)
    // When I first used the app, the first task I added disappeared
   
    const saved = localStorage.getItem("taskPositions");
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

     const filteredTaskPositions = taskPositions.filter(t => t.id !== id)
     setTaskPositions(filteredTaskPositions)
  }

  //clickedId = id of task card clicked on, swappedId = id of task card to be swapped with
  function handleMoveTask(clickedId, swappedId) {


    const tasksCopy = [...tasks];  

    const clickedIndex = tasksCopy.findIndex((el) => el.id === clickedId)
    const clickedTask = tasksCopy[clickedIndex]
    const swappedIndex = tasksCopy.findIndex((el) => el.id === swappedId)
    const swappedTask = tasksCopy[swappedIndex]

    tasksCopy.splice(clickedIndex, 1, swappedTask)
    tasksCopy.splice(swappedIndex, 1, clickedTask)

    setTasks(tasksCopy)

 
    const taskPositionsCopy = [...taskPositions]

    let newPositions = []

    tasksCopy.forEach((el, index) => {

      let itemId = taskPositionsCopy.filter(task => task.id === el.id)

      let item = {
        id: itemId[0].id,
        x: taskPositionsCopy[index].x,
        y: taskPositionsCopy[index].y
      }

      //item.id = taskPositionsCopy[index].x
      
      newPositions.push(item)
    })
    

    setTaskPositions(newPositions)
    
  }




  // if 'back' is true, move back in array, otherwise move foward
  function handleArrowClick(id, back) {

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
    setTaskPositions([])
  }

  //update task positions array with current x/y position of task card
   async function handleTaskPositions(id, x, y) {
    //pass id, x, y

    //need to make async? Or is local storage always faster than React state?
    const storedPositions = JSON.parse(localStorage.getItem('taskPositions'))

      if (!storedPositions) {
        return;
      }

      const includes = storedPositions.filter(p => id === p.id)
    
      
      if (includes.length === 0 ) {
        setTaskPositions([...taskPositions, {id: id, x: x, y: y}])
      }

      
    
  }
   

  useEffect(() => {
    // storing input name
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // storing input name
    localStorage.setItem("taskPositions", JSON.stringify(taskPositions));
  }, [taskPositions]);




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
        handleArrowClick={handleArrowClick}
        handleMoveTask={handleMoveTask}
        taskPositions={taskPositions}
        handleTaskPositions={handleTaskPositions}
      />

      )
      })}
      <View>
      <Button onClick={signOut}>Sign out</Button>
      </View>
    </div>
    
  );
}

export default withAuthenticator(App);
