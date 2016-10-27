/**
 * Created by asnik on 27/10/2016.
 */
/* We want this file to be run on both the client and the server */
import { Mongo } from 'meteor/mongo';

export const Parties = new Mongo.Collection('parties');

// Security rules for the parties.
Parties.allow({
    insert(userId, party) {
        return userId && party.owner === userId;
    },
    update(userId, party, fields, modifier) {
        return userId && party.owner === userId;
    },
    remove(userId, party) {
        return userId && party.owner === userId;
    }
});