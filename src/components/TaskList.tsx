import { useState, useEffect } from 'react'

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
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    setTasks(tasks);
  });  

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    /*Deve ser possível adicionar uma nova task no estado de tasks, 
    com os campos id que deve ser gerado de forma aleatória, title que deve ser um texto e 
    isComplete que deve iniciar como false. */
    setCounter(counter + 1);

    if(newTaskTitle != ''){

      tasks.push({
        id: counter,
        title: newTaskTitle,
        isComplete: false
      });

      setTasks(tasks);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    /*Deve alterar o status de isComplete para uma task com um ID específico que é recebido por parâmetro. */

      let newArr = [...tasks];

      if(newArr[id].isComplete){
        newArr[id].isComplete = false;
        console.log('ficou false')
      }else{
        newArr[id].isComplete = true;
        console.log('ficou true')
      }

    setTasks(newArr);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    /*Deve receber um ID por parâmetro e remover a task que contém esse ID do estado.*/

    let newArr = [...tasks];

    
    
    setTasks(newArr);
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
            <FiCheckSquare size={16} color="#fff"/>
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
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
