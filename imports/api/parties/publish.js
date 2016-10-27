import { Meteor } from 'meteor/meteor';

import { Parties } from './collection';

if (Meteor.isServer) {
    // Rules for viewing the parties
    // (public? -> everyone can see)
    // (has owner? -> only owner can see)
    // by default $exists: false since we removed "autopublish"
    Meteor.publish('parties', function() {
        const selector = {
            $or: [{
                // the public parties
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                // when logged in user is the owner
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }]
        };

        return Parties.find(selector);
    });
}