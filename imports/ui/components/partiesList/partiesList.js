import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './partiesList.html';
import { Parties } from '../../../api/parties';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';

// Class is basically a controller
class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        // Add the 'parties' dataset subscription defined in api
        this.subscribe('parties');

        // defining helpers inside constructor and loading all parties
        this.helpers({
            parties() {
                return Parties.find({});
            }
        });
    }
}

const name = 'partiesList';

// This module 'partiesList' is exported to main module 'socially'.
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartyAdd,
    PartyRemove
]).component(name, { //component
    template, // import template partiesList.html with urigo:static-templates
    controllerAs: name, // how to call controller from the view
    controller: PartiesList // reference to controller (class)
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });
}