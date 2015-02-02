Questions = new Mongo.Collection("questions");

  if (Meteor.isClient) {

    Template.body.helpers({
      questions: function () {
        return Questions.find({}, {sort: {createdAt: -1}});
      }
    });

    Template.body.events({
      "submit .new-question": function (event) {
        event.preventDefault();
        console.log('default prevented')

       var text = event.target.text.value;
        
        Questions.insert({
          text: text,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username
        });

        event.target.text.value = "";
      }
    });

    Template.question.events({
      "click .delete": function () {
        Questions.remove(this._id);
      }
    });

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

  }


// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
