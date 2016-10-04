/* We want this file to be run on both the client and the server */
import { Mongo } from 'meteor/mongo'

export const Parties = new Mongo.Collection(';parties')