///////////////////////////////////////////////////////////////////////////////
//                                 Client                                    // 
///////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  Meteor.startup(function () {

    // shout out to my boys over at css-tricks.com for smooth scrolling
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
  });

  Template.app.helpers({
    people: function() {
      console.log(Meteor.users.find({_id: {$ne: Meteor.userId()}},{}).fetch());
      return Meteor.users.find({_id: {$ne: Meteor.userId()}},{}).fetch();
    }
  });

  Template.app.events({
    "click #sign-out": function (event, template) {
      Meteor.logout(); 
    }
  })
}

///////////////////////////////////////////////////////////////////////////////
//                                 Server                                    // 
///////////////////////////////////////////////////////////////////////////////
if (Meteor.isServer) {
  Meteor.startup(function () {


  });

  Meteor.methods({
    checkInviteCode: function (code) {
        // TODO implement invite code functionality
        if (code == 1) {
          return true
        } else {
          return false
        };
    }
  });
}

///////////////////////////////////////////////////////////////////////////////
//                                 Router                                    // 
///////////////////////////////////////////////////////////////////////////////
Router.route('/', function () {
  this.render('home');
});

Router.route('/network', function () {
  this.render('network');
});

