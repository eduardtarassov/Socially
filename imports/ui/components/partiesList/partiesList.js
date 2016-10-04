import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partiesList.html';

// Class is basically a controller
class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

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
    angularMeteor
]).component(name, { //component
    template, // import template partiesList.html with urigo:static-templates
    controllerAs: name, // how to call controller from the view
    controller: PartiesList // reference to controller (class)
});