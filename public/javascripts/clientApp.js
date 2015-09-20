    // create the module and name it scotchApp
    var dsApp = angular.module('dsApp', ['ngRoute']);

    // configure our routes
    dsApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })
			
			// route for the IPs page
            .when('/ips', {
                templateUrl : 'pages/ips.html',
                controller  : 'ipsConroller'
            });
    });	
	
    // create the controller and inject Angular's $scope
    dsApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
	
	dsApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    dsApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
	
    dsApp.controller('ipsConroller', function($scope) {
        $scope.message = 'IPs page';

		$scope.populateIPData = function(){
			$.getJSON( "/ips")
			.done(function( data ) {
			  
			  var table = $("#ipTable");
			  table.empty();
			  
			  table.append($('<thead>')
					.append($('<tr>')
						.append($('<td>')
							.text('IntegrityID')
						)
						.append($('<td>')
							.text('Title')
						)
						.append($('<td>')
							.text('Project')
						)
					)			  
			  )
			  .append($('<tbody>'));
			  
		
			  
			  for(var i in data){
				  //Console.log(data[i]._id);
				  
				$("#ipTable").find('tbody')
					.append($('<tr>')
						.append($('<td>')
							.text(data[i].IntegrityID)
						)
						.append($('<td>')
							.text(data[i].Title)
						)
						.append($('<td>')
							.text(data[i].Project)
						)
					);		  
				  
			  }
			  
			});
		};
		
    });	