import { useState } from 'react';
import styles from './App.module.css'
import { Task } from './components/Task';
import {ITask} from './interfaces/ITask'
import { useEnterClick } from './hooks/useEnterClick';

export const App = () => {

  const [todoList, setTodoList] = useState([
    {
        id: "test1",
        title: 'Тестовое задание',
        isCompleted: true
    },
    {
        id: "test2",
        title: 'Прекрасный код',
        isCompleted: true
    },
    {
        id: "test3",
        title: 'Покрытие тестами',
        isCompleted: false
    }
  ]);

  const [currentFilter, setCurrentFilter] = useState('all');

  const currentArray = currentFilter === 'active' ? todoList.filter(el => el.isCompleted === false)
                      : currentFilter === 'completed' ? todoList.filter(el => el.isCompleted)
                      : todoList;

  const addTask = () => {
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const checkFieldsLength = titleInput.value.length;
    if(checkFieldsLength) {
      const titleValue = titleInput.value;
      const task: ITask = {
        id: crypto.randomUUID(), 
        title: titleValue, 
        isCompleted: false
      }
      const updatedArray = [...todoList, task];
      setTodoList(updatedArray);
      titleInput.value = '';
      return console.log('Добавлена задача: ', task);
    }
    return
  }

  const setCompleted = (task: ITask) => {
    task.isCompleted = !task.isCompleted;
    const updatedArray = [...todoList]
    setTodoList(updatedArray);
  }

  const setFilter = (filter: string) => {
    setCurrentFilter(filter)
  }

  const clearCompleted = () => {
    const withoutCompleted = todoList.filter(el => el.isCompleted === false);
    setTodoList(withoutCompleted);
  }

  const lenChekerValue = todoList.filter(el => el.isCompleted === false).length;

  const handleEnterClick = useEnterClick(addTask)!;

  return (
    <main>
      <div className={styles.todos_background}>

        <h1>todos</h1>

        <div className={styles.todos_window}>

            <input id="title" className={styles.task_create_input} onKeyDown={handleEnterClick} type="text" placeholder='What needs to be done?' spellCheck={true}/>
            
            {currentArray.map((task: ITask) => <Task key={task.id} task={task} setCompleted={setCompleted}/>)}
            
            <div className={styles.bottom_toolbar}>

              <p className={styles.active_tasks_len_cheker}>{lenChekerValue} item{lenChekerValue > 1 ? 's' : ''} left</p>

              <div className={styles.bottom_toolbar_choose_list_buttons}>

                <button className={styles.bottom_toolbar_buttons} type='button' 
                        onClick={() => setFilter('all')} style={currentFilter === 'all' ? {border: "1px solid rgb(214, 214, 214)"}:{}}>
                        All
                </button>

                <button className={styles.bottom_toolbar_buttons} type='button' 
                        onClick={() => setFilter('active')} style={currentFilter === 'active' ? {border: "1px solid rgb(214, 214, 214)"}:{}}>
                        Active
                </button>

                <button className={styles.bottom_toolbar_buttons} type='button' 
                        onClick={() => setFilter('completed')} style={currentFilter === 'completed' ? {border: "1px solid rgb(214, 214, 214)"}:{}}>
                        Completed
                </button>

              </div>
        
              <button className={styles.bottom_toolbar_buttons} type='button' onClick={() => clearCompleted()}>Clear completed</button>
            
            </div>
        </div>

      </div>
    </main>
  )
}
