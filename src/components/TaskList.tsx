import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newId, setNewId] = useState(0);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle) {
      let objData = {
        id: newId,
        title: newTaskTitle,
        isComplete: false
      }

      let objJson = objData

      setTasks([objJson, ...tasks])
      setNewId(newId + 1)

      console.log(newId)
      console.log(tasks)
      console.log(newTaskTitle)
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    for (let index in tasks) {
      let task = tasks[index]

      if (id === task.id) {
        if (task.isComplete === false) {
          task.isComplete = true
          console.log('true')
        } else {
          task.isComplete = false
          console.log('false')
        }

        setTasks([...tasks])
        console.log(tasks)
      }
    }

  }

  function handleRemoveTask(id: number) {
    let newArrList: Task[] = []

    for (let index in tasks) {
      let task = tasks[index]
      if (id === task.id) {
        let startIndex = Number(index)
        newArrList = tasks.splice(startIndex, 1)
      }
    }
    setTasks([...newArrList])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}