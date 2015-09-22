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
                controller  : 'ipsController'
            })
			
			
			// route for the IPs page
            .when('/ips/:id', {
                templateUrl : 'pages/ip.html',
                controller  : 'ipController'
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
	
    dsApp.controller('ipsController', function($scope) {
        $scope.message = 'IPs page';
		
		$(function () {
            $('[data-toggle="table"]').bootstrapTable();
        });

	
    });	
	
    dsApp.controller('ipController', ['$scope','$routeParams',function($scope,$routeParams) {
        $scope.message = 'Single IP page: ' + $routeParams.id;
    }]);	
	