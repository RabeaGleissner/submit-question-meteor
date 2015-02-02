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
    },

      "click .set-research": function () {
        Meteor.call("setResearch", this._id);
      },
      "click .set-answered": function () {
        Meteor.call("setAnswered", this._id);
      },
      "click .clear": function () {
        Meteor.call("clearClass", this._id);
      }

    });

    Template.question.helpers({
      isOwner: function () {
        return this.owner === Meteor.userId();
      },

      isRabea: function () {
        return Meteor.userId() === "tMWD5PiAGTxDYfMDL";
      },

      idTag: function () {
        if (this.category == 'google') {
          return 'google';
        } else if (this.category == 'research') {
          return 'research';
        } else if (this.category == 'answered') {
          return 'answered';
        } else if (this.category == 'clear') {
          return '';
        }
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
        {category: 'google'}
      });
    },

    setResearch: function (id) {
      console.log('set Research');
      Questions.update(id, {$set: 
        {category: 'research'}
      });
    },

    setAnswered: function (id) {
      console.log('set answered');
      Questions.update(id, {$set: 
        {category: 'answered'}
      });
    },

    clearClass: function (id) {
      console.log('clearClass');
      Questions.update(id, {$set: 
        {category: 'clear'}
      });
    }

    });


if (Meteor.isServer) {
  Meteor.publish("questions", function () {
      return Questions.find();
    });
}


