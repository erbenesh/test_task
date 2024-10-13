import styles from './Task.module.css'
import { ITask } from './../interfaces/ITask';
import Radio from '@mui/material/Radio';

interface Props {
    task: ITask
    setCompleted: (task: ITask) => void
}

export const Task = (props: Props) => {

    return (
        <div className={styles.task}>
            <Radio
                color="default"
                checked={props.task.isCompleted}
                onClick={() => props.setCompleted(props.task)}
                name="radio-buttons"
            />
            <p className={styles.task_title} 
                style={props.task.isCompleted ? {textDecoration: 'line-through', color: 'rgb(214, 214, 214)'} : {}}>
                    {props.task.title}
            </p>
        </div>
    )
}