
///////////////////////////////////////////////////////////////////////////////
//                                 Client                                    // 
///////////////////////////////////////////////////////////////////////////////
if (Meteor.isClient) {
  Meteor.startup(function () {
    // Login template

    

    AccountsTemplates.removeField('email');
    AccountsTemplates.removeField('password');
    AccountsTemplates.addFields([
      {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 3,
      },
      {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "email",
        re: /.+@(.+){2,}\.(.+){2,}/
      },
      {
        _id: "invite",
        type: "text",
        required: true,
        displayName: 'Invite Code',
        placeholder: ' ',
        func: function(value) { 
          Meteor.call('checkInviteCode', value);
          return true;
        },
        errStr: 'Email Thomas.Wang@tufts.edu for a code!'
      },
      {
        _id: 'password',
        type: 'password',
        required: true,
        minLength: 6,
      }
    ]);

    AccountsTemplates.addFields([
      {
        _id: 'name',
        type: 'text',
        required: true,
        displayName: "Full Name",
        placeholder: "Alice Bob",
        minLength: 1,
        func: function(value){ return (value.split(" ").length > 1) },
        errStr: 'Please enter full name.',
      },
      {
        _id: 'year',
        type: 'text',
        required: true,
        displayName: "Class Year",
        placeholder: "Class Year",
        minLength: 4,
        maxLength: 4,
        func: function(value){return /^\d+$/.test(value) && (value >= 1950 && value <= 2020)},
        errStr: 'Only real class years allowed!',
      },
      {
        _id: 'job',
        type: 'text',
        required: false,
        displayName: "Job Title",
        placeholder: "Software Engineer",
      },
      {
        _id: 'company',
        type: 'text',
        required: false,
        displayName: "Company",
        placeholder: "Dunder-Mifflin",
      },
      {
        _id: 'role',
        type: 'radio',
        select: [
          {
            text: "Engineering",
            value: "dev"
          }, {
            text: "Design",
            value: "des"
          }, {
            text: "Product",
            value: "pm"
          },
          {
            text: "Non-Tech",
            value: "non"
          }
        ],
        required: false,
        displayName: "Role (Optional)",
      }
    ]);



    AccountsTemplates.init();
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

