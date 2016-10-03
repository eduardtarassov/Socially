import angular from 'angular';
import angularMeteor from 'angular-meteor';

angular.module('socially', [
    angularMeteor
])
.controller('PartiesListCtrl', function($scope) {
    'ngInject';
    $scope.parties = [{
        'name': 'Dubstep-Free Zone',
        'description': 'Can we please just for an evening not listen to dubstep.'
    }, {
        'name': 'All dubstep all the time',
        'description': 'Not today!'
    }];
});