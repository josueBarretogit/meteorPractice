import { Meteor } from "meteor/meteor";
import { Task, TaskCollection } from "/imports/api/taskCollection";
import "../imports/api/taskPublication";
import { Accounts } from 'meteor/accounts-base';

type InsertTask = Pick<Task, "text">;

async function insertTask(data: InsertTask) {
  return TaskCollection.insertAsync({ text: data.text, createdAt: new Date(), isChecked: false });
}

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

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

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    await Accounts.createUserAsync({ username: SEED_USERNAME, password: SEED_PASSWORD })
  }

  //const user = Accounts.findUserByUsername(SEED_USERNAME);
});
