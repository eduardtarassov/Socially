import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './socially.html';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as PartyDetails } from '../partyDetails/partyDetails';
//import { name as Navigation } from '../navigation/navigation';

class Socially {}

const name = 'socially';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartiesList,
    PartyDetails,
    'accounts.ui'
    //Navigation
]).component(name, {
    template,
    controllerAs: name,
    controller: Socially
})
    .config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';

    //Sets the URL to look like a regular one. More info: https://docs.angularjs.org/guide/$location#hashbang-and-html5-modes
    $locationProvider.html5Mode(true);

    // Triggers a redirection to /parties when the browser address doesn't match either of out routes.
    $urlRouterProvider.otherwise('/parties');
}

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        }
    );
}