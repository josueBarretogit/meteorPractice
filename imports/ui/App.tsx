import React, { useState } from "react";
import { TaskCollection } from "../api/taskCollection";
import { useTracker, } from "meteor/react-meteor-data";
import { TaskForm } from "./TaskForm";
import TaskList from "./Task";
import { Meteor } from "meteor/meteor";
import LoginForm from "./components/LoginForm";

function useSub(name: string): () => boolean {
  let handle = Meteor.subscribe(name)

  return () => handle.ready()
}


export default function App() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const user = useTracker(() => Meteor.user());

  const isLoading = useSub("tasks");

  const tasks = useTracker(() =>
    TaskCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch(),
  );

  const pendingTasksCount = useTracker(() =>
    TaskCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = pendingTasksCount === 0 ? "" : `(${pendingTasksCount})`

  return (
    isLoading() ? <>

      <div>Loading...</div>

    </> :

      <div className="app">

        {

          user ? <>

            <h1>📝️ To Do List {pendingTasksTitle}</h1>

            <header>
              <div className="app-bar">
                <div className="app-header">
                  <h1>Welcome to Meteor!</h1>
                </div>
              </div>
            </header>


            <div className="main">

              <TaskForm />

              <div className="filter">
                <button onClick={() => setHideCompleted(!hideCompleted)}>
                  {hideCompleted ? 'Show All' : 'Hide Completed'}
                </button>
              </div>

              <TaskList tasks={tasks} />

            </div>

          </>
            : <LoginForm />
        }

      </div>


  );
}
