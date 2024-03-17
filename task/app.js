var app = angular.module('userManagementApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'list.html',
        controller: 'ListController'
    })
    .when('/details/:userId', {
        templateUrl: 'details.html',
        controller: 'DetailsController'
    })
    .when('/create', {
        templateUrl: 'create.html',
        controller: 'CreateController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.controller('ListController', function($scope, $http, $location) {
    $http.get('https://reqres.in/api/users')
    .then(function(response) {
        $scope.users = response.data.data;
    });

    $scope.showDetails = function(userId) {
        $location.path('/details/' + userId);
    };
});

app.controller('DetailsController', function($scope, $http, $routeParams) {
    var userId = $routeParams.userId;
    $http.get('https://reqres.in/api/users/' + userId)
    .then(function(response) {
        $scope.user = response.data.data;
    });
});

app.controller('CreateController', function($scope, $http, $location) {
    $scope.createUser = function() {
        var userData = {
            name: $scope.name,
            job: $scope.job
        };

        $http.post('https://reqres.in/api/users', userData)
        .then(function(response) {
            alert('User created successfully');
            $location.path('/');
        });
    };
});
