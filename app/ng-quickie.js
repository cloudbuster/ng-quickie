var myApp = angular.module('ngQuickie', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider

        .when('/templateOne', {
            templateUrl : './templates/templateOne.html',
            controller : 'templateOneController'
        })

        .when('/templateTwo', {
            templateUrl : './templates/templateTwo.html',
            controller : 'templateTwoController'
        })

        .otherwise( {
            templateUrl : './templates/mainTemplate.html',
            controller : 'mainTemplateController'
        });
});

/* todo: write service to collect stuff (DONE) */
myApp.service('storeDataService', function(){
    this.tempStorage = {};
});

myApp.controller('mainController', function($scope){
    $scope.title = 'mainController';
});

myApp.controller('templateOneController', function($scope, $http, $log, storeDataService){
    $scope.title = 'One';

    $http({
        method: 'GET',
        url: './api/mockup-data.json'
    }).then(function successCallback(response) {
        storeDataService.tempStorage = response.data;
        $log.info('Success!');
        $log.info(JSON.stringify(storeDataService.tempStorage));
    }, function errorCallback(response) {
        $log.info('Error: ' + response.data);
    });

});

myApp.controller('templateTwoController', function($scope, storeDataService){
    $scope.title = 'Two';
    $scope.persons = storeDataService.tempStorage;
});

myApp.controller('mainTemplateController', function($scope){
    $scope.title = 'Main';
});

