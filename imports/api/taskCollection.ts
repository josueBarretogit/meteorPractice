import { Mongo } from "meteor/mongo";

export interface Task {
  _id?: string;
  text: string;
  userId?: string;
  isChecked: boolean
  createdAt: Date;
}

export const TaskCollection = new Mongo.Collection<Task>("Tasks");
