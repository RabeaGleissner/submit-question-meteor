Questions = new Mongo.Collection("questions");

  if (Meteor.isClient) {

    Template.body.helpers({
      questions: function () {
        return Questions.find({});
      }
    });
  }


// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
