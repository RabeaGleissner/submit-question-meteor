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
          createdAt: new Date()
        });

      //   event.target.text.value = "";
      }
    });
  }


// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
