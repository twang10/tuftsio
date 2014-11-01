
///////////////////////////////////////////////////////////////////////////////
//                                 Client                                    // 
///////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  Meteor.startup(function () {
    // shout out to my boys over at css-tricks.com
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

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.home.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

///////////////////////////////////////////////////////////////////////////////
//                                 Server                                    // 
///////////////////////////////////////////////////////////////////////////////
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
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