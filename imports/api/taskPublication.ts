import { Meteor } from "meteor/meteor";
import { TaskCollection } from "./taskCollection";

Meteor.publish("tasks", () => {
  return TaskCollection.find();
});
