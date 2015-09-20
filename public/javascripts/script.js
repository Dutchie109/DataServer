    // create the module and name it scotchApp
    var dsApp = angular.module('dsApp', []);

    // create the controller and inject Angular's $scope
    dsApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });