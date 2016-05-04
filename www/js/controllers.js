angular.module('app.controllers', ['jett.ionic.filter.bar'])

.controller('eventCtrl', function($scope, $state, $stateParams) {
	$scope.doRefresh = function() {
		populateList();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$apply()
	};

	function populateList() {
		var Event = Parse.Object.extend("Event");
		var event = new Parse.Query(Event);
		event.equalTo("objectId", $stateParams.name);
		event.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var Ename = object.get('name');
					var Ecat = object.get('cat');
					var Efee = object.get('fee');
					var Edetails = object.get('details');
					var Elink = object.get('link');
					var Evenue = object.get('venue');
					var Edatetime = object.get('datetime');
					var Eimage = object.get('image');
					var Euni = object.get('uni');
					var Euser = object.get('createdBy');

					if(Ecat == 1)
						Ecat = "Arts/Culture/Festival";
					else if(Ecat == 2)
						Ecat = "Community Service"
					else if(Ecat == 3)
						Ecat = "Competition/Contest"
					else if(Ecat == 4)
						Ecat = "Conferences,Seminars & Fairs"
					else if(Ecat == 5)
						Ecat = "Fitness & Leisure"
					else if(Ecat == 6)
						Ecat = "Career & Networking Events"
					else if(Ecat == 7)
						Ecat = "Community Service"
					else
						Ecat = "Others"

					if(Efee == 0)
						Efee = "Free";

					$scope.name = Ename;
					$scope.cat = Ecat;
					$scope.details = Edetails;
					$scope.link = Elink;
					$scope.venue = Evenue;
					$scope.datetime = Edatetime;
					$scope.image = Eimage.url();
					$scope.uni = Euni;
					$scope.fee = Efee;
				}
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
}

populateList();
})

.controller('mainCtrl', function($scope, $state, $ionicFilterBar) {
	$scope.itemsList = [];

	$scope.showFilterBar = function () {
		var filterBarInstance = $ionicFilterBar.show({
			cancelText: "<i class='ion-ios-close-outline'></i>",
			items: $scope.itemsList,
			update: function (filteredItems, filterText) {
				$scope.itemsList = filteredItems;
			}
		});
	};


	function populateList() {
		var Event = Parse.Object.extend("Event");
		var event = new Parse.Query(Event);
		event.descending("createdAt");		
		event.find({
			success: function (results) {
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var Eid = object.id;
					var Ename = object.get('name');
					var Edatetime = object.get('datetime');
					var Eimage = object.get('image');
					var Euni = object.get('uni');
					$scope.itemsList.push({"id":Eid, "name":Ename, "datetime":Edatetime, "image":Eimage.url(), "uni":Euni});
				}

			},
			error: function (error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

	$scope.doRefresh = function() {
		$scope.itemsList = [];
		populateList();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$apply()
	};

	$scope.showDetails = function(item) {
		$state.go("eventDetails", {id: 1, name: item.id});
	};

	populateList();

})

.controller('loginCtrl', function($scope, $state) {
	var currentUser = Parse.User.current();
	if (currentUser) {
		$state.go("user"); 
	} else {
		$scope.data = {};

		$scope.loginEmail = function(){
			Parse.User.logIn($scope.data.username, $scope.data.password, {
				success: function(user) {
	      // Do stuff after successful login.
	      $state.go("user");
	  },
	  error: function(user, error) {
	      // The login failed. Check error to see why.
	      alert("error!");
	  }
	});
		};
	}
})

.controller('signupCtrl', function($scope,$state) {
	$scope.data = {};

	$scope.signupEmail = function(){

		//Create a new user on Parse
		var user = new Parse.User();
		user.set("username", $scope.data.username);
		user.set("email", $scope.data.email);
		user.set("phone", $scope.data.phone);
		user.set("password", $scope.data.password);

		user.signUp(null, {
			success: function(user) {
				$state.go("tabsController.login"); 
			},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};
})

.controller('pageCtrl', function($scope) {

})

.controller('userCtrl', function($scope, $state) {
	var currentUser = Parse.User.current();
	var name= currentUser.get("username");
	$scope.user = name;

	$scope.logout = function() {
		Parse.User.logOut();
		$state.go("tabsController.main"); 
	};

	$scope.postEvent = function() {
		$state.go("post"); 
	};

	$scope.viewEvent = function() {
		$state.go("viewEvent", {}, {reload: true});
	};
})

.controller('postCtrl', function($scope, $state) {
	$scope.data = {};

	$scope.home = function() {
		$state.go("tabsController.main"); 
	};

	$scope.submit = function(evt) {
		var Event = Parse.Object.extend("Event");
		var event = new Event();

		var fileUploadControl = $("#eventImage")[0];
		// var fileUploadControl = $("#eventImage")[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = "photo.jpg";
			var parseFile = new Parse.File(name, file);
		}

		parseFile.save();

		event.set("image", parseFile)
		event.set("cat", $scope.data.cat);
		event.set("name", $scope.data.name);
		event.set("venue", $scope.data.venue);
		event.set("datetime", $scope.data.datetime);
		event.set("fee", $scope.data.fee);
		event.set("link", $scope.data.link);
		event.set("details", $scope.data.details);
		event.set("uni", $scope.data.uni);

		event.save(null, {
			success: function(gameScore) {
				alert('New object created with objectId: ' + event.id);
			},
			error: function(gameScore, error) {
				alert('Failed to create new object, with error code: ' + error.message);
			}
		});
	};
})

.controller('viewCtrl', function($scope, $state) {
	$scope.doRefresh = function() {
		populateList();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$apply()
	};

	function populateList() {
		$scope.itemsList = [];

		var Event = Parse.Object.extend("Event");
		var event = new Parse.Query(Event);
		var currentUser = Parse.User.current();
		console.log(currentUser.id)
		event.equalTo("createdBy", currentUser.id);
		event.descending("createdAt");		
		event.find({
			success: function (results) {
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					var Ename = object.get('name');
					var Edatetime = object.get('datetime');
					var Eimage = object.get('image');
					var Euni = object.get('uni');
					$scope.itemsList.push({"name":Ename, "datetime":Edatetime, "image":Eimage.url(), "uni":Euni});
				}
			},
			error: function (error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	populateList();
})

