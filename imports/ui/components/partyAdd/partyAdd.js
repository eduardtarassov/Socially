import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyAdd.html';
import { Parties } from '../../../api/parties';
import { Meteor } from 'meteor/meteor';

class PartyAdd {
    constructor() {
        this.party = {};
    }

    submit() {
        // add current user to the new party
        this.party.owner = Meteor.user()._id;
        // create a new party
        Parties.insert(this.party);
        this.reset();
    }

    reset() {
        this.party = {};
    }
}

const name = 'partyAdd';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: PartyAdd
});