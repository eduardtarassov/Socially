/**
 * Created by asnik on 17/10/2016.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './partyDetails.html';
import { Parties } from '../../../api/parties';

// PartyDetails Controller
class PartyDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        // Using scope to attach one object
        $reactive(this).attach($scope);

        // /parties/:partyId Variables with the : notation are passed to the Component through the $stateParams object
        this.partyId = $stateParams.partyId;

        this.subscribe('parties');

        this.helpers({
            party() {
                // Calling findOne MongoDB query
                return Parties.findOne({ // Find particular party (search by id)
                    _id: $stateParams.partyId
                });
            }
        });
    }

    save() {
        Parties.update({ // Using update method from the Mongo.Collection object
            _id: this.party._id
        }, {
            $set: {
                name: this.party.name,
                description: this.party.description,
                public: this.party.public
            }
        }, // Handling fail of update function
            (error) => {
            if (error) {
            console.log('Oops, unable to update the party...');
        } else {
            console.log('Done!');
        }
    });
    }
}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: PartyDetails
})
    .config(config);


// Using our router
function config($stateProvider) {
    'ngInject';

    $stateProvider.state('partyDetails', {
        url: '/parties/:partyId',
        template: '<party-details></party-details>',

        // Not allowing unauthenticated users to see the party details of other users
        resolve: {
            currentUser($q) {
                if (Meteor.userId() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}