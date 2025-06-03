import React from "react";
import { Task, TaskCollection } from "../api/taskCollection";

export interface ITask {
  _id: string;
  text: string;
  isChecked: boolean;
}

export interface TaskProps {
  task: ITask;
  onCheckBox: (task: ITask) => void;
  onDeleteClick: (task: ITask) => void;
}

interface TaskListProps {
  tasks: Task[];
}


async function toggleChecked(id: string, isChecked: boolean) {
  await TaskCollection.updateAsync(id, {
    $set: {
      isChecked: !isChecked,
    },
  });
}

async function deleteTask(id: string,) {
  await TaskCollection.removeAsync(id)
}


function TaskListItem({ task, onCheckBox, onDeleteClick }: TaskProps) {
  let { _id, text, isChecked } = task;

  return (
    <ul key={_id} className="tasks">
      <input
        type="checkbox"
        checked={!!isChecked}
        onClick={() => onCheckBox({ _id, text, isChecked })}
        readOnly
      />
      <span>{text}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </ul>
  );
}



export default function TaskList({ tasks }: TaskListProps) {
  return tasks.map((task) => (
    <TaskListItem
      task={{ _id: task._id!, text: task.text, isChecked: task.isChecked }}
      onCheckBox={(selected) => toggleChecked(selected._id, selected.isChecked)}
      onDeleteClick={(task) => deleteTask(task._id!)}
    />
  ));
}
