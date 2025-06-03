import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TaskCollection } from './taskCollection';

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
    this.userId

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TaskCollection.insert({
      text,
      createdAt: new Date,
      isChecked: false,
      userId: this.userId,
    })
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TaskCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TaskCollection.update(taskId, {
      $set: {
        isChecked
      }
    });
  }
});
