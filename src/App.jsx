import {useState,useEffect} from "react"
import  "./app.css"

function App(){
  const [newTask,setNewTask]=useState("");
  const [updateTask,setUpdateTask]=useState("");

  const [task,setTask]=useState([{
id:1,
text: "Learn React",
completed: false
  },
{
  id:2, text:"Do strength Training", completed: true
}])

const pendingTasks = task.filter(item => !item.completed);
const completedTasks = task.filter(item => item.completed);
const totalTasks = task.length;
const pendingCount = pendingTasks.length;
const completedCount = completedTasks.length;
const progress =  task.length === 0 ? 0 : Math.round((completedTasks.length / task.length) * 100);  
function handleadd(){
  if(!newTask.trim()){ return; }
  const tasks = {
  id: task.length + 1,
  text: newTask,
  completed: false
};

setTask([
  ...task,
  tasks
]);
setNewTask("");
}
function handleDelete(id) {
  setTask(task.filter(item => item.id!==id
  ))
}
function handletoggle(id) {
  const updatedTasks = task.map(item => {
    if (item.id === id) {
      return {
        ...item,
        completed: !item.completed
      };
    }

    return item;
  });

  setTask(updatedTasks);
}
  return ( 
<>
<h1> Task Manager </h1>
<div className="input">
<input type="text"
value={newTask}
 onChange={(e) => setNewTask(e.target.value)}
placeholder="Enter the task"></input><br></br>
<button  className="addbutton" onClick={handleadd}> ADD</button>
</div>

      <h2>Pending Tasks</h2>
    <ul>
  {pendingTasks.map(item => (
  <li key={item.id}>
    {item.text}

    <button onClick={() => handletoggle(item.id)}>
      Complete
    </button>

    <button onClick={() => handleDelete(item.id)}>
      Delete
    </button>
  </li>
))}
    </ul>
<h2> Completed Tasks</h2>
<ul>
  {completedTasks.map(item => (
    <li key={item.id}>{item.text}</li>
  ))}
</ul>
<h3>Dashboard</h3>

<div className="dashboard">

  <div className="progress-section">
    <h2>Progress: {progress}%</h2>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>

  <div className="stats">
    <div className="stat-card">
      <h2>{totalTasks}</h2>
      <p>Total Tasks</p>
    </div>

    <div className="stat-card">
      <h2>{completedCount}</h2>
      <p>Completed</p>
    </div>

    <div className="stat-card">
      <h2>{pendingCount}</h2>
      <p>Pending</p>
    </div>
  </div>

</div>

</>
  );
}
export default App;