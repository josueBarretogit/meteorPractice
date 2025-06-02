import React, { FormEvent, useState } from "react";
import { TaskCollection } from "../api/taskCollection";

export const TaskForm = () => {
  const [text, setText] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!text) return;

    await TaskCollection.insertAsync({
      text: text.trim(),
      createdAt: new Date(),
      isChecked: false
    });

    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};
