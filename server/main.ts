import { Meteor } from "meteor/meteor";
import { Task, TaskCollection } from "/imports/api/taskCollection";
import "../imports/api/taskPublication";

type InsertTask = Pick<Task, "text">;

async function insertTask(data: InsertTask) {
  return TaskCollection.insertAsync({ text: data.text, createdAt: new Date(), isChecked: false });
}

Meteor.startup(async () => {
  const tasks = await TaskCollection.find().fetchAsync();

  if (tasks.length == 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((text) => insertTask({ text }));
  }
});
