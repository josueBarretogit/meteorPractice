import React from "react";
import { Hello } from "./Hello";
import { Info } from "./Info";
import { Task, TaskCollection } from "../api/taskCollection";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm";
import TaskList from "./Task";



export function App() {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() =>
    TaskCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
  ) as Task[];

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Welcome to Meteor!</h1>

      <Hello />
      <Info />

      <TaskForm />

      <TaskList tasks={tasks} />
    </>
  );
}
