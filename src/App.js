import { useState, useEffect } from 'react';
import './App.css';
import NewTaskForm from './Components/NewTaskForm';
import TaskCard from './Components/TaskCard';


//give tasks keys

//filter task by key when x is clicked



function App() {
 
  const [tasks, setTasks] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  function handleCreateNewTask(newTask) {
    
    const id = Math.floor(Math.random() * 1000000)

    setTasks([...tasks, {...newTask, id: id}])

    
  }


  function removeTask(id) {
     const filteredTasks = tasks.filter(task => task.id !== id)
     setTasks(filteredTasks)
  }
   

  useEffect(() => {
    // storing input name
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div className="App">
      <NewTaskForm
        createNewTask={handleCreateNewTask}
      />
      {tasks && tasks.map((task) => {
      return (

      <TaskCard 
        task={task}
        key={task.id}
        removeTask={removeTask}
      />

      )
      })}
    </div>
  );
}

export default App;
