Questions = new Mongo.Collection("questions");

  if (Meteor.isClient) {
    Meteor.subscribe("questions");

    Template.body.helpers({
      questions: function () {
        return Questions.find({}, {sort: {createdAt: -1}});
      }
    });

    Template.body.events({
      "submit .new-question": function (event) {
      event.preventDefault();
      var text = event.target.text.value;
      Meteor.call("addQuestion", text);
      event.target.text.value = "";
      }
    });

    Template.question.events({
      "click .delete": function () {
    Meteor.call("deleteQuestion", this._id);
      },

      "click .set-google": function () {
      Meteor.call("setGoogle", this._id);
    }

    });

    Template.question.helpers({
      isOwner: function () {
        return this.owner === Meteor.userId();
      }
    });

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

  }

  Meteor.methods({
    
    addQuestion: function (text) {
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
    Questions.insert({
          text: text,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      },

    deleteQuestion: function (questionId) {
        Questions.remove(questionId);
      },

    setGoogle: function (id) {
      console.log('set Google');
      Questions.update(id, {$set: 
        {google: true}
      });
    }

    });

if (Meteor.isServer) {
  Meteor.publish("questions", function () {
      return Questions.find();
    });
}


