angular.module('app.routes', [])

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('menu.competiton', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/competiton.html',
        controller: 'competitonCtrl'
      }
    }
  })


  .state('tabsController.main', {
    url: '/main',
    views: {
      'tab1': {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      }
    }
  })


  .state('tabsController', {
    url: '/page1',
    abstract:true,
    templateUrl: 'templates/tabsController.html'
  })


  .state('tabsController.login', {
    url: '/login',
    views: {
      'tab2': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })


  .state('menu', {
    url: '/side-menu21',
    abstract:true,
    templateUrl: 'templates/menu.html'
  })

  .state('post', {
    url: '/post',
    templateUrl: 'templates/post.html',
    controller: 'postCtrl'
  })

  .state('user', {
    cache: false,
    url: '/user',
    templateUrl: 'templates/user.html',
    controller: 'userCtrl'
  })

  .state('viewEvent', {
    cache: false,
    url: '/view',
    templateUrl: 'templates/viewEvent.html',
    controller: 'viewCtrl'
  })

  .state('eventDetails', {
    url: '/eventDetails/{id}?name',
    templateUrl: 'templates/eventDetails.html',
    controller: 'eventCtrl',
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1/main');

});